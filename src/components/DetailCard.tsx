import type { Project } from '../types';

interface Props {
  project: Project;
  onClose: () => void;
}

export const DetailCard = ({ project, onClose }: Props) => (
  <div className="detail-overlay" onClick={onClose}>
    <div className="detail-card glass" onClick={(e) => e.stopPropagation()}>
      <button className="detail-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="detail-eyebrow">{project.tags.join(' · ').toUpperCase()}</div>
      <h2 className="detail-name">{project.name}</h2>
      <p className="detail-headline">{project.headline}</p>
      <p className="detail-desc">{project.description}</p>
      <div className="detail-actions">
        {project.links.github && (
          <a className="detail-btn" href="#" onClick={(e) => e.preventDefault()}>
            GitHub
          </a>
        )}
        {project.links.demo && (
          <a className="detail-btn" href="#" onClick={(e) => e.preventDefault()}>
            Demo
          </a>
        )}
        {project.links.try && (
          <a className="detail-btn primary" href="#" onClick={(e) => e.preventDefault()}>
            Try it
          </a>
        )}
      </div>
    </div>
  </div>
);
