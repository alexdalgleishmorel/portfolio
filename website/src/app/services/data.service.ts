import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public experiences: Experience[] = [
    {
      timeRange: 'DEC 2024 - PRESENT',
      title: 'Software Developer',
      description: [
        'In my current role at Blackline Safety, I continue to develop and maintain a variety of applications, and improve our development processes to maximize our team efficiency.'
      ],
      attributes: [
        'Full-Stack', 'Agile',
      ],
      titles: [
        'Blackline Safety',
      ]
    },
    {
      timeRange: 'MAY 2022 - DEC 2024',
      title: 'Software Development Intern',
      description: [
        'During my internship at Blackline Safety, I contributed to both backend and frontend development across various teams.',
        'At the beginning and end of my internship, I developed and maintained backend applications in Python and PHP, implemented and improved API endpoints, and enhanced system efficiency, reliability, and observability.',
        'During the middle of my internship, I focused on the customer-facing Angular portal, leading Angular version upgrades, improving the UI testing framework, and delivering new components.',
      ],
      attributes: [
        'Full-Stack', 'Angular', 'Python', 'PHP', 'API', 'CI/CD', 'Unit/UI Tests', 'Observability'
      ],
      titles: [
        'Blackline Safety',
      ]
    },    
    {
      timeRange: 'SEPT 2019 - DEC 2024',
      title: 'Student',
      description: [
        'My computer science degree covered a comprehensive curriculum that provided a deep dive into both theoretical and practical aspects of computing.',
        'This included foundational courses in data structures, database management, algorithm design & analysis, operating systems, computer networks, and more.',
        'Later, the concentration of my degree centered on the human element of computing, with courses related to human-computer interaction.',
        'This focused on understanding the ways in which we can created functional software that is enjoyable and intuitive for its users.'
      ],
      attributes: [
        'User Experience', 'UX Design', 'Data Structures', 'Algorithm Analysis', 'Computer Networks',
      ],
      titles: [
        'University of Calgary',
        'Computer Science'
      ]
    },
  ];

  public projects: Project[] = [
    {
      year: '2025',
      title: 'Mortgage Visualization App',
      hook: "How much will my house really cost? How do lump sum payments affect my future?",
      description: 'This app enables new or prospective homeowners to easily answer those questions.',
      attributes: [
        'Angular', 'Data Visualization',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/mortgage-calculator',
      demoLink: '',
      liveDemoLink: 'https://alexdalgleishmorel.github.io/mortgage-calculator'
    },
    {
      year: '2024',
      title: 'Flow Report App',
      hook: "What are the current river surfing conditions? When's the next best time to surf?",
      description: 'This app enables the Alberta river surfing community to easily answer those questions.',
      attributes: [
        'React', 'Data Visualization', 'API Integration',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/flow-report',
      demoLink: 'https://youtu.be/E7JZoNrNiq0',
      liveDemoLink: 'https://alexdalgleishmorel.github.io/flow-report'
    },
    {
      year: '2023',
      title: 'Average Cost App',
      hook: 'How much more of an asset should I buy? How will it affect my average cost?',
      description: 'This app helps to answer those questions in a visual and intuitive way.',
      attributes: [
        'Angular', 'Data Visualization', 'API Integration',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/average-cost-app',
      demoLink: 'https://youtu.be/BLWp4dxiaz0',
      liveDemoLink: 'https://alexdalgleishmorel.github.io/average-cost-app'
    },
    {
      year: '2023',
      title: 'Poker Flow V1',
      hook: 'Setting up and managing a poker game can be a hassle.',
      description: 'This app simplifies the tasks of game setup, buy-ins and cashouts so that players can focus on the game itself.',
      attributes: [
        'Angular', 'Websocket', 'Data Visualization', 'Custom API Integration',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/poker-flow-app/tree/V1',
      demoLink: 'https://youtu.be/QoeoyLg-N_g',
      liveDemoLink: ''
    },
    {
      year: '2023',
      title: 'Poker Flow V1 API',
      hook: 'The backbone for the Poker Flow V1 application.',
      description: 'This app handles all Poker Flow transactions, all while keeping clients updated in real time.',
      attributes: [
        'API', 'Python', 'Flask', 'Websocket', 'Database Management',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/poker-flow-api/tree/V1',
      demoLink: '',
      liveDemoLink: ''
    },
  ];

  constructor() {}
}

export interface Experience {
  timeRange: string;
  title: string;
  description: string[];
  attributes: string[];
  titles: string[];
}

export interface Project {
  year: string;
  title: string;
  hook: string;
  description: string;
  attributes: string[];
  githubLink: string;
  demoLink: string;
  liveDemoLink: string;
}
