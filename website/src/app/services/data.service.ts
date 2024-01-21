import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public experiences: Experience[] = [
    {
      timeRange: 'SEPT 2022 - PRESENT',
      title: 'Software Development Intern',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
      ],
      titles: [
        'Blackline Safety',
        'Emerald Team'
      ]
    },
    {
      timeRange: 'MAY 2022 - SEPT 2022',
      title: 'Software Development Intern',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
      ],
      titles: [
        'Blackline Safety',
        'Onyx Team'
      ]
    },
    {
      timeRange: 'SEPT 2019 - DEC 2024',
      title: 'Student',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
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
  description: string;
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
