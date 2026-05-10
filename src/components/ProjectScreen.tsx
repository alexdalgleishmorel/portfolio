import type { CSSProperties } from 'react';
import type { Project } from '../types';
import { motifs } from '../motifs';

interface Props {
  project: Project;
  reducedMotion: boolean;
}

export const ProjectScreen = ({ project, reducedMotion }: Props) => {
  const { name, headline, accent, accent2, motif, tags } = project;
  const Motif = motifs[motif];
  return (
    <div
      className="ps-root"
      style={{
        background: `radial-gradient(120% 140% at 20% 10%, ${accent2}55, transparent 55%),
                     radial-gradient(120% 140% at 90% 100%, ${accent}40, transparent 60%),
                     linear-gradient(160deg, #0d0a1f 0%, #1a1535 60%, #2a1a3a 100%)`,
      }}
    >
      <div
        className={`ps-motif ps-motif-${motif} ${reducedMotion ? 'ps-static' : ''}`}
        style={{ '--a': accent, '--b': accent2 } as CSSProperties}
      >
        <Motif accent={accent} accent2={accent2} />
      </div>

      <div className="ps-content">
        <div className="ps-eyebrow">{tags.join(' · ').toUpperCase()}</div>
        <div className="ps-name">{name}</div>
        <div className="ps-headline">{headline}</div>
      </div>
    </div>
  );
};
