import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'expense-visualizer',
    name: 'Expense Visualizer',
    headline:
      'Where is my money actually going? What will I spend next month?',
    description:
      'This AI-powered expense tracker lets you import statements, auto-categorize spending, build dashboards, and just ask questions about your money in plain language.',
    links: {
      github: 'https://github.com/alexdalgleishmorel/budget-trace',
      demo: 'https://www.youtube.com/watch?v=CJE12_HOLzs',
      try: 'https://alexdalgleishmorel.github.io/budget-trace/',
    },
    accent: '#38BDF8',
    accent2: '#2DD4BF',
    motif: 'expense-visualizer',
  },
  {
    id: 'mortgage',
    name: 'Mortgage Visualization App',
    headline:
      'How much will my house really cost? How do lump sum payments affect my future?',
    description:
      'This app enables new or prospective homeowners to easily answer those questions.',
    links: {
      github: 'https://github.com/alexdalgleishmorel/mortgage-calculator',
      try: 'https://alexdalgleishmorel.github.io/mortgage-calculator',
    },
    accent: '#F0A36B',
    accent2: '#7A4FE0',
    motif: 'mortgage',
  },
  {
    id: 'flow-report',
    name: 'Flow Report App',
    headline:
      "What are the current river surfing conditions? When's the next best time to surf?",
    description:
      'This app enables the Alberta river surfing community to easily answer those questions.',
    links: {
      github: 'https://github.com/alexdalgleishmorel/flow-report',
      demo: 'https://youtu.be/E7JZoNrNiq0',
      try: 'https://alexdalgleishmorel.github.io/flow-report',
    },
    accent: '#5FD0C8',
    accent2: '#3A6BFF',
    motif: 'flow-report',
  },
  {
    id: 'average-cost',
    name: 'Average Cost App',
    headline:
      'How much more of an asset should I buy? How will it affect my average cost?',
    description:
      'This app helps to answer those questions in a visual and intuitive way.',
    links: {
      github: 'https://github.com/alexdalgleishmorel/average-cost-app',
      demo: 'https://youtu.be/BLWp4dxiaz0',
      try: 'https://alexdalgleishmorel.github.io/average-cost-app',
    },
    accent: '#FFB070',
    accent2: '#E04F8E',
    motif: 'average-cost',
  },
  {
    id: 'poker-flow',
    name: 'Poker Flow V1',
    headline: 'Setting up and managing a poker game can be a hassle.',
    description:
      'This app simplifies the tasks of game setup, buy-ins and cashouts so that players can focus on the game itself.',
    links: {
      github: 'https://github.com/alexdalgleishmorel/poker-flow-app/tree/V1',
      demo: 'https://youtu.be/QoeoyLg-N_g',
    },
    accent: '#C8A2FF',
    accent2: '#5462E8',
    motif: 'poker-flow',
  },
];
