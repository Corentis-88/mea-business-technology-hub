import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CourseId, ProgressStatus, RevisionTask, TopicProgress } from "../types";

interface AppStateValue {
  progress: Record<string, TopicProgress>;
  tasks: RevisionTask[];
  favourites: string[];
  updateProgress: (courseId: CourseId, topicId: string, score: number) => void;
  setTopicStatus: (courseId: CourseId, topicId: string, status: ProgressStatus) => void;
  addTask: (task: Omit<RevisionTask, "id" | "complete">) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  toggleFavourite: (key: string) => void;
}

const AppState = createContext<AppStateValue | undefined>(undefined);
const storageKey = "mea-revision-hub-state-v1";

function readState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "{}") as Partial<Pick<AppStateValue, "progress" | "tasks" | "favourites">>;
  } catch {
    return {};
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const saved = typeof window === "undefined" ? {} : readState();
  const [progress, setProgress] = useState<Record<string, TopicProgress>>(saved.progress ?? {});
  const [tasks, setTasks] = useState<RevisionTask[]>(saved.tasks ?? []);
  const [favourites, setFavourites] = useState<string[]>(saved.favourites ?? []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ progress, tasks, favourites }));
  }, [progress, tasks, favourites]);

  const value = useMemo<AppStateValue>(() => ({
    progress,
    tasks,
    favourites,
    updateProgress: (courseId, topicId, score) => {
      const key = `${courseId}:${topicId}`;
      setProgress((current) => {
        const previous = current[key] ?? { status: "not-started", bestScore: 0, attempts: 0 };
        const status: ProgressStatus = score >= 80 ? "secure" : score >= 45 ? "learning" : "revisit";
        return { ...current, [key]: { status, bestScore: Math.max(previous.bestScore, score), attempts: previous.attempts + 1, lastStudied: new Date().toISOString() } };
      });
    },
    setTopicStatus: (courseId, topicId, status) => {
      const key = `${courseId}:${topicId}`;
      setProgress((current) => ({ ...current, [key]: { ...(current[key] ?? { bestScore: 0, attempts: 0 }), status, lastStudied: new Date().toISOString() } }));
    },
    addTask: (task) => setTasks((current) => [...current, { ...task, id: crypto.randomUUID(), complete: false }]),
    toggleTask: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, complete: !task.complete } : task)),
    removeTask: (id) => setTasks((current) => current.filter((task) => task.id !== id)),
    toggleFavourite: (key) => setFavourites((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]),
  }), [progress, tasks, favourites]);

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
}

export function useAppState() {
  const value = useContext(AppState);
  if (!value) throw new Error("useAppState must be used inside AppStateProvider");
  return value;
}
