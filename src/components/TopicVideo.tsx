import { ExternalLink, PlayCircle, ShieldCheck } from "lucide-react";
import type { CourseId } from "../types";
import { videoForTopic } from "../data/videos";

export function TopicVideo({ courseId, topicId }: { courseId: CourseId; topicId: string }) {
  const video = videoForTopic(courseId, topicId);
  if (!video) return null;
  return <section className="topic-video" aria-labelledby="topic-video-heading">
    <header><PlayCircle /><div><span className="eyebrow">Carefully selected video</span><h2 id="topic-video-heading">Watch: {video.title}</h2><p>{video.description}</p></div></header>
    {video.embedUrl && <div className="topic-video__frame"><iframe src={video.embedUrl} title={`${video.title} by ${video.provider}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
    <div className="topic-video__footer"><span><ShieldCheck />{video.qualityNote}</span><a className="button button--secondary" href={video.href} target="_blank" rel="noreferrer">Open {video.provider} resource <ExternalLink /></a></div>
  </section>;
}
