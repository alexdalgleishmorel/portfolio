import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Visualization App',
    headline: 'How much will my house really cost?',
    description:
      'An interactive tool for new and prospective homeowners to model amortization, equity growth, and the real long-term cost of a mortgage at a glance.',
    tags: ['Angular', 'Data Visualization'],
    links: { github: '#', try: '#' },
    accent: '#F0A36B',
    accent2: '#7A4FE0',
    motif: 'wave',
  },
  {
    id: 'flow-report',
    name: 'Flow Report App',
    headline: 'Where did the day actually go?',
    description:
      'A dashboard that aggregates timed work sessions into legible weekly flow reports, surfacing patterns hidden in raw clock-in data.',
    tags: ['React', 'Data Visualization', 'API Integration'],
    links: { github: '#', demo: '#', try: '#' },
    accent: '#5FD0C8',
    accent2: '#3A6BFF',
    motif: 'rings',
  },
  {
    id: 'average-cost',
    name: 'Average Cost App',
    headline: 'What does a normal week even cost?',
    description:
      'Pulls in transaction data and quietly calculates rolling baselines so spending anomalies surface before they become a problem.',
    tags: ['Angular', 'Data Visualization', 'API Integration'],
    links: { github: '#', demo: '#', try: '#' },
    accent: '#FFB070',
    accent2: '#E04F8E',
    motif: 'bars',
  },
  {
    id: 'poker-flow',
    name: 'Poker Flow V1',
    headline: 'Reading the table, one hand at a time.',
    description:
      'An early experiment in tracking poker hand histories and visualizing decision trees across long live sessions.',
    tags: ['Prototype', 'Game Logic'],
    links: { github: '#' },
    accent: '#C8A2FF',
    accent2: '#5462E8',
    motif: 'pulse',
  },
];
