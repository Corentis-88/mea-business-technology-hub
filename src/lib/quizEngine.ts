import type { Course, QuizDifficulty, QuizQuestion, Topic } from "../types";

export interface QuizSessionOptions {
  course: Course;
  topicId?: string;
  difficulty: QuizDifficulty;
  count: number;
  seed?: number;
}

export interface QuizSession {
  questions: QuizQuestion[];
  availableQuestionCount: number;
  usesReinforcement: boolean;
}

const difficultyOrder: QuizDifficulty[] = ["low", "medium", "high"];

export const difficultyFromSlider = (value: number): QuizDifficulty =>
  difficultyOrder[Math.max(0, Math.min(2, Math.round(value) - 1))];

export const difficultyLabel = (difficulty: QuizDifficulty) =>
  difficulty[0].toUpperCase() + difficulty.slice(1);

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function shuffle<T>(items: T[], key: string) {
  return items
    .map((value, index) => ({ value, order: hash(`${key}:${index}:${String(value)}`) }))
    .sort((a, b) => a.order - b.order)
    .map(({ value }) => value);
}

function normaliseSpacing(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function readableExcerpt(value: string, maximumLength = 170) {
  const clean = normaliseSpacing(value);
  if (clean.length <= maximumLength) return clean;

  const completeSentences = clean.match(/.*?[.!?](?=\s|$)/g) ?? [];
  const excerpt: string[] = [];
  let length = 0;

  for (const sentence of completeSentences) {
    const nextLength = length + (excerpt.length ? 1 : 0) + sentence.length;
    if (nextLength > maximumLength) break;
    excerpt.push(sentence);
    length = nextLength;
  }

  // A long complete sentence is preferable to a fragment with a broken ending.
  return excerpt.length ? excerpt.join(" ") : (completeSentences[0] ?? clean);
}

function compact(value: string) {
  return readableExcerpt(value, 190);
}

function unique(values: string[]) {
  return [...new Set(values.map(compact).filter(Boolean))];
}

function makeQuestion(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  topic: Topic,
  difficulty: QuizDifficulty,
  seed: number,
): QuizQuestion | null {
  const optionCount = difficulty === "low" ? 3 : 4;
  const alternatives = shuffle(unique(distractors).filter((item) => item !== compact(correct)), `${id}:${seed}`);
  if (alternatives.length < optionCount - 1) return null;
  const options = shuffle([compact(correct), ...alternatives.slice(0, optionCount - 1)], `${id}:options:${seed}`);
  return {
    id,
    // Prompts can contain a question followed by quoted context. Keep that whole
    // structure intact; shortening it can remove the closing quote or key detail.
    prompt: normaliseSpacing(prompt),
    options,
    answer: options.indexOf(compact(correct)),
    explanation: compact(explanation),
    difficulty,
    sourceTopicId: topic.id,
    sourceTopicTitle: topic.title,
  };
}

function directQuestion(question: QuizQuestion, topic: Topic, difficulty: QuizDifficulty, seed: number): QuizQuestion {
  const options = shuffle(question.options, `${question.id}:direct:${difficulty}:${seed}`);
  const correct = question.options[question.answer];
  const lead = difficulty === "low"
    ? ""
    : difficulty === "medium"
      ? "Think carefully. "
      : `Use what you know about ${topic.title}. `;
  return {
    ...question,
    id: `${topic.id}:direct:${difficulty}:${question.id}`,
    prompt: `${lead}${question.prompt}`,
    options,
    answer: options.indexOf(correct),
    difficulty,
    sourceTopicId: topic.id,
    sourceTopicTitle: topic.title,
  };
}

function topicBank(course: Course, topic: Topic, difficulty: QuizDifficulty, seed: number) {
  const courseTopics = course.units.flatMap((unit) => unit.topics);
  const terms = courseTopics.flatMap((item) => item.keyTerms);
  const definitions = unique(terms.map((term) => term.definition));
  const termNames = unique(terms.map((term) => term.term));
  const topicTitles = unique(courseTopics.map((item) => item.title));
  const headings = unique(courseTopics.flatMap((item) => item.sections.map((section) => section.heading)));
  const explanations = unique(courseTopics.flatMap((item) => item.quiz.map((question) => question.explanation)));
  const positiveActions = unique(courseTopics.flatMap((item) => item.examTips));
  const mistakes = unique(courseTopics.flatMap((item) => item.commonMistakes));
  const questions: Array<QuizQuestion | null> = [];

  topic.quiz.forEach((question) => {
    questions.push(directQuestion(question, topic, difficulty, seed));
    const correctOption = question.options[question.answer];
    const reasoningPrompt = difficulty === "high"
      ? `Which explanation best shows why “${correctOption}” answers this question? ${question.prompt}`
      : `Why is “${correctOption}” the best answer to this question? ${question.prompt}`;
    questions.push(makeQuestion(
      `${topic.id}:reason:${difficulty}:${question.id}`,
      reasoningPrompt,
      question.explanation,
      explanations,
      `${question.explanation} This links the answer to the key idea.`,
      topic,
      difficulty,
      seed,
    ));
  });

  topic.keyTerms.forEach((term, index) => {
    const definitionPrompt = difficulty === "high"
      ? `Which subject term best matches this meaning? “${term.definition}”`
      : `Which term matches this meaning? “${term.definition}”`;
    questions.push(makeQuestion(`${topic.id}:term-name:${difficulty}:${index}`, definitionPrompt, term.term, termNames, `${term.term} means ${term.definition}`, topic, difficulty, seed));
    questions.push(makeQuestion(`${topic.id}:term-definition:${difficulty}:${index}`, `What is the best definition of “${term.term}”?`, term.definition, definitions, `${term.term} means ${term.definition}`, topic, difficulty, seed));
    questions.push(makeQuestion(`${topic.id}:term-link:${difficulty}:${index}`, `Which meaning is linked to “${term.term}”?`, term.definition, definitions, `${term.term} means ${term.definition}`, topic, difficulty, seed));
  });

  topic.keyTerms.forEach((term, index) => {
    const otherTerm = topic.keyTerms[(index + 1) % topic.keyTerms.length];
    const isTrue = index % 2 === 0 || otherTerm === term;
    questions.push({
      id: `${topic.id}:true-false:${difficulty}:${index}`,
      prompt: `True or false? “${term.term} means ${isTrue ? term.definition : otherTerm.definition}”`,
      options: ["True", "False"],
      answer: isTrue ? 0 : 1,
      explanation: `${term.term} means ${term.definition}`,
      format: "true-false",
      difficulty,
      sourceTopicId: topic.id,
      sourceTopicTitle: topic.title,
    });
    questions.push({
      id: `${topic.id}:fill-gap:${difficulty}:${index}`,
      prompt: `Type the missing subject term. _____ means: ${term.definition}`,
      options: [],
      answer: 0,
      explanation: `The missing term is ${term.term}. ${term.term} means ${term.definition}`,
      format: "fill-gap",
      acceptedAnswers: [term.term],
      difficulty,
      sourceTopicId: topic.id,
      sourceTopicTitle: topic.title,
    });
  });

  for (let index = 0; index < topic.keyTerms.length; index += 3) {
    const group = topic.keyTerms.slice(index, index + 3);
    if (group.length < 2) continue;
    questions.push({
      id: `${topic.id}:matching:${difficulty}:${index}`,
      prompt: "Match each subject term to its correct meaning.",
      options: shuffle(group.map((term) => term.definition), `${topic.id}:matching:${index}:${seed}`),
      answer: 0,
      explanation: group.map((term) => `${term.term}: ${term.definition}`).join(" "),
      format: "matching",
      matchingPairs: group.map((term) => ({ prompt: term.term, answer: term.definition })),
      difficulty,
      sourceTopicId: topic.id,
      sourceTopicTitle: topic.title,
    });
  }

  topic.commonMistakes.forEach((mistake, index) => {
    const prompt = difficulty === "high"
      ? `Which mistake should a student correct when reviewing ${topic.title}?`
      : `Which common mistake should you avoid in ${topic.title}?`;
    questions.push(makeQuestion(`${topic.id}:mistake:${difficulty}:${index}`, prompt, mistake, positiveActions, `Avoid this: ${mistake}`, topic, difficulty, seed));
  });

  topic.examTips.forEach((tip, index) => {
    const prompt = difficulty === "high"
      ? `Which action would make an exam answer about ${topic.title} more precise?`
      : `Which action would improve an answer about ${topic.title}?`;
    questions.push(makeQuestion(`${topic.id}:tip:${difficulty}:${index}`, prompt, tip, mistakes, `This action would improve the answer: ${tip}`, topic, difficulty, seed));
  });

  topic.sections.forEach((section, sectionIndex) => {
    questions.push(makeQuestion(
      `${topic.id}:section-topic:${difficulty}:${sectionIndex}`,
      `“${section.heading}” belongs to which revision topic?`,
      topic.title,
      topicTitles,
      `${section.heading} is an area within ${topic.title}.`,
      topic,
      difficulty,
      seed,
    ));
    section.paragraphs.forEach((paragraph, paragraphIndex) => {
      const information = readableExcerpt(paragraph);
      questions.push(makeQuestion(
        `${topic.id}:section:${difficulty}:${sectionIndex}:${paragraphIndex}`,
        difficulty === "high" ? `Which section of ${topic.title} best matches this information? “${information}”` : `Which section heading best matches this information? “${information}”`,
        section.heading,
        headings,
        `This is covered by ${section.heading} within ${topic.title}.`,
        topic,
        difficulty,
        seed,
      ));
    });
    if (section.example) {
      questions.push(makeQuestion(`${topic.id}:example:${difficulty}:${sectionIndex}`, `Which revision topic does this example show? “${section.example}”`, topic.title, topicTitles, `This example applies ${topic.title}.`, topic, difficulty, seed));
    }
  });

  questions.push(makeQuestion(`${topic.id}:summary:${difficulty}`, `Which revision topic matches this summary? “${topic.summary}”`, topic.title, topicTitles, `This summary describes ${topic.title}.`, topic, difficulty, seed));

  const seen = new Set<string>();
  return questions.filter((question): question is QuizQuestion => {
    if (!question) return false;
    const signature = `${question.prompt}|${question.options.join("|")}`;
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

export function createQuizSession({ course, topicId, difficulty, count, seed = 1 }: QuizSessionOptions): QuizSession {
  const allTopics = course.units.flatMap((unit) => unit.topics);
  const selectedTopics = topicId ? allTopics.filter((topic) => topic.id === topicId) : allTopics;
  const maximum = topicId ? 20 : 50;
  const requestedCount = Math.max(1, Math.min(maximum, Math.round(count)));
  const bank = selectedTopics.flatMap((topic) => topicBank(course, topic, difficulty, seed));
  const ordered = shuffle(bank, `${course.id}:${topicId ?? "all"}:${difficulty}:${seed}`);
  const questions = ordered.slice(0, requestedCount);
  let reinforcementRound = 2;

  while (questions.length < requestedCount && ordered.length) {
    for (const original of shuffle(ordered, `${seed}:reinforcement:${reinforcementRound}`)) {
      if (questions.length >= requestedCount) break;
      const options = shuffle(original.options, `${original.id}:reinforcement:${reinforcementRound}`);
      const correct = original.options[original.answer];
      questions.push({
        ...original,
        id: `${original.id}:reinforcement:${reinforcementRound}`,
        prompt: `Try this question again (round ${reinforcementRound}). ${original.prompt}`,
        options,
        answer: options.indexOf(correct),
        reinforcement: true,
      });
    }
    reinforcementRound += 1;
  }

  return {
    questions,
    availableQuestionCount: bank.length,
    usesReinforcement: questions.some((question) => question.reinforcement),
  };
}
