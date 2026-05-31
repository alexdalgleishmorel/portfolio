export type MotifKey =
  | 'wave'
  | 'rings'
  | 'bars'
  | 'pulse'
  | 'mortgage'
  | 'flow-report'
  | 'average-cost'
  | 'poker-flow'
  | 'expense-visualizer';

export interface ProjectLinks {
  github?: string;
  demo?: string;
  try?: string;
}

export interface Project {
  id: string;
  name: string;
  headline: string;
  description: string;
  links: ProjectLinks;
  accent: string;
  accent2: string;
  motif: MotifKey;
}
