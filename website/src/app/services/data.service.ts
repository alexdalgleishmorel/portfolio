import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public experiences: Experience[] = [
    {
      timeRange: 'SEPT 2022 - PRESENT',
      title: 'Software Development Intern',
      description: [
        'As a member of the Emerald team, my role involves development of the customer-facing Angular portal, where users manage and monitor their fleet of devices.',
        'My contributions involve on-time implementation and deployment of new components, along with strong UI tests to ensure reliability.',
        "I've undertook multiple major Angular version upgrades, along with improvements to our testing framework to eliminate warnings and linting errors, and spearheaded projects to upgrade our external libraries.",
      ],
      attributes: [
        'Frontend', 'Angular', 'Agile', 'AWS', 'CI/CD', 'Unit/UI Tests', 'Refactoring'
      ],
      titles: [
        'Blackline Safety',
        'Emerald Team'
      ]
    },
    {
      timeRange: 'MAY 2022 - SEPT 2022',
      title: 'Software Development Intern',
      description: [
        'As a member of the Onyx team, my role was in developing and maintaining the backend applications which support the functionality of the Blackline software ecosystem.',
        'This role required proficiency with Python, PHP, and SQL, along with a strong grasp on interacting with relational databases.',
        'My contributions involved the implementation of new API endpoints and the improvement of existing ones.',
        'These improvements focused on enhancing efficiency, reliability and observability.'
      ],
      attributes: [
        'Backend', 'API', 'Agile', 'Data Processing', 'Python', 'Bug Resolution', 'Observability'
      ],
      titles: [
        'Blackline Safety',
        'Onyx Team'
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
      year: '2023',
      title: 'Average Cost App',
      hook: 'How much more of an asset should I buy? How will it affect my average cost?',
      description: 'This app helps to answer those questions in a visual and intuitive way.',
      attributes: [
        'Angular', 'Data Visualization', 'API Integration',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/average-cost-app',
      demoLink: '',
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
      demoLink: '',
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
