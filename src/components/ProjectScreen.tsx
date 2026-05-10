import type { CSSProperties } from 'react';
import type { Project } from '../types';
import { motifs } from '../motifs';

interface Props {
  project: Project;
  reducedMotion: boolean;
}

export const ProjectScreen = ({ project, reducedMotion }: Props) => {
  const { accent, accent2, motif } = project;
  const Motif = motifs[motif];
  return (
    <div className="ps-root">
      <div
        className={`ps-motif ps-motif-${motif} ${reducedMotion ? 'ps-static' : ''}`}
        style={{ '--a': accent, '--b': accent2 } as CSSProperties}
      >
        <Motif accent={accent} accent2={accent2} />
      </div>
    </div>
  );
};
