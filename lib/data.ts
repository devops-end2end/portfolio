import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface CareerData {
  basics: {
    name: string;
    label: string;
    location: string;
    status: string;
    value_props: {
      manager: string;
      architect: string;
      master: string;
    };
  };
  skills: {
    cloud_k8s: string[];
    gitops_cicd: string[];
    data_ml_search: string[];
    devsecops_observability: string[];
    hardware_networking: string[];
  };
  case_studies: {
    id: string;
    title: string;
    problem: string;
    solution: string;
    metrics: string[];
    architecture: string;
  }[];
  experience: {
    company: string;
    location: string;
    tenure: string;
    roles: string[];
    achievements: string[];
    tags: string[];
  }[];
}

export function getCareerData(): CareerData {
  const filePath = path.join(process.cwd(), 'data', 'career.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as CareerData;
}
