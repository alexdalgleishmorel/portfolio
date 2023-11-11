import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public experiences: Experience[] = [
    {
      timeRange: '2022 - PRESENT',
      title: 'Software Development Intern',
      company: 'Blackline Safety',
      description: 'Some sort of semi-long description where I go into the details of the job, including key points and criteria that I feel really stands out about what I did with them.',
      attributes: [
        'one', 'two', 'three',
      ]
    }
  ];

  public projects: Project[] = [
    {
      title: 'Average Cost Calculator',
      description: 'Some sort of description for the average cost calculator',
      attributes: [
        'one', 'two', 'three',
      ]
    }
  ];

  constructor() {}
}

export interface Experience {
  timeRange: string;
  title: string;
  company: string;
  description: string;
  attributes: string[];
}

export interface Project {
  title: string;
  description: string;
  attributes: string[];
}
