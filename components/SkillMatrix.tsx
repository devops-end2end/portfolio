'use client';

import React from 'react';

interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: 'Expert' | 'Advanced' | 'Proficient' }[];
}

interface SkillMatrixProps {
  skills: {
    cloud_k8s: string[];
    gitops_cicd: string[];
    data_ml_search: string[];
    devsecops_observability: string[];
    hardware_networking: string[];
  };
}

const categoryMap: Record<string, { title: string; description: string }> = {
  cloud_k8s: {
    title: 'Cloud & K8s Platforms',
    description: 'Multi-cloud architectures, bare-metal clusters, and container orchestration.',
  },
  gitops_cicd: {
    title: 'GitOps & CI/CD Pipelines',
    description: 'Declarative infrastructure-as-code and automated canary delivery workflows.',
  },
  data_ml_search: {
    title: 'Data, MLOps & Vector Search',
    description: 'High-throughput real-time distributed data pipelines and AI retrieval engines.',
  },
  devsecops_observability: {
    title: 'DevSecOps, Identity & Observability',
    description: 'Zero-trust networks, telemetric telemetry tracing, and secrets management.',
  },
  hardware_networking: {
    title: 'Hardware & Networking',
    description: 'Datacenter hardware engineering, low-latency switching, and edge networks.',
  },
};

export default function SkillMatrix({ skills }: SkillMatrixProps) {
  // Convert the YAML object structure into the array structure the UI expects
  const skillCategories: SkillCategory[] = Object.entries(skills).map(([key, skillList]) => {
    const meta = categoryMap[key] || { title: key, description: '' };
    return {
      title: meta.title,
      description: meta.description,
      skills: skillList.map(s => ({ name: s })),
    };
  });

  return (
    <section id="skills" className="py-16 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">Technical Competencies</h2>
          <p className="text-zinc-400 mt-2 text-base">
            Categorized skills across infrastructure architecture, platform engineering, and enterprise operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200"
                    >
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
