import { Eye, Image as ImageIcon, Sparkles } from "lucide-react";
import "./teaching-picture.css";

export interface TeachingPictureSpec {
  src: string;
  alt: string;
  caption: string;
  title?: string;
  focalPoints?: string[];
}

export function TeachingPicture({ picture }: { picture: TeachingPictureSpec }) {
  return (
    <figure className="teaching-picture">
      <div className="teaching-picture__image-wrap">
        <img
          src={`${import.meta.env.BASE_URL}${picture.src.replace(/^\//, "")}`}
          alt={picture.alt}
          loading="lazy"
          decoding="async"
          width="1200"
          height="800"
        />
        <span className="teaching-picture__badge"><ImageIcon aria-hidden="true" /> Picture the idea</span>
      </div>
      <div className="teaching-picture__meaning">
        <div>
          <span className="teaching-picture__eyebrow"><Sparkles aria-hidden="true" /> What this picture teaches</span>
          {picture.title && <h3>{picture.title}</h3>}
          <figcaption>{picture.caption}</figcaption>
        </div>
        {picture.focalPoints?.length ? <div className="teaching-picture__look-for">
          <strong><Eye aria-hidden="true" /> Look for</strong>
          <ul>{picture.focalPoints.map((point) => <li key={point}>{point}</li>)}</ul>
        </div> : null}
      </div>
    </figure>
  );
}

