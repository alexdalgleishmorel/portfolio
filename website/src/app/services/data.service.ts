import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public experiences: Experience[] = [
    {
      timeRange: 'SEPT 2023 - MAY 2024',
      title: 'Software Development Intern',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
      ],
      titles: [
        'Blackline Safety',
      ]
    },
    {
      timeRange: 'SEPT 2022 - SEPT 2023',
      title: 'Software Development Intern',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
      ],
      titles: [
        'Blackline Safety',
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
      ]
    }
  ];

  public projects: Project[] = [
    {
      title: 'Average Cost Calculator',
      description: 'Some sort of description for the average cost calculator',
      attributes: [
        'one', 'two', 'three',
      ],
      submoduleName: 'average-cost'
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
  title: string;
  description: string;
  attributes: string[];
  submoduleName?: string;
}
