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
      title: 'Poker Flow V1',
      description: 'Some sort of description for pokerflow',
      attributes: [
        'one', 'two', 'three',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/poker-flow-app/tree/V1',
      demoLink: '',
      liveDemoLink: ''
    },
    {
      year: '2023',
      title: 'Average Cost Calculator',
      description: 'Some sort of description for the average cost calculator',
      attributes: [
        'one', 'two', 'three',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/average-cost-app',
      demoLink: '',
      liveDemoLink: 'https://alexdalgleishmorel.github.io/average-cost-app'
    },
    {
      year: '2023',
      title: 'Personal Website',
      description: 'Some sort of description for my personal website',
      attributes: [
        'one', 'two', 'three',
      ],
      githubLink: 'https://github.com/alexdalgleishmorel/alexdalgleishmorel.com',
      demoLink: '',
      liveDemoLink: ''
    }
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
  description: string;
  attributes: string[];
  githubLink: string;
  demoLink: string;
  liveDemoLink: string;
}
