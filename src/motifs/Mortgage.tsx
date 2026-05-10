import type { MotifProps } from './index';
import type { CSSProperties } from 'react';

export const Mortgage = ({ accent, accent2 }: MotifProps) => (
  <div
    className="mortgage-motif"
    style={{ '--a': accent, '--b': accent2 } as CSSProperties}
  >
    <div className="mortgage-grid">
      <span />
      <span />
      <span />
      <span />
    </div>

    <div className="mortgage-bars mortgage-bars-a">
      {Array.from({ length: 18 }).map((_, i) => (
        <i key={`a-${i}`} />
      ))}
    </div>

    <svg className="mortgage-line" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path
        pathLength="100"
        d="M 0 34 C 22 38, 42 45, 58 56 S 84 82, 100 96"
      />
    </svg>
  </div>
);
