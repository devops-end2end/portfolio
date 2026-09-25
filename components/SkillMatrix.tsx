'use client';

import React from 'react';

interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: 'Expert' | 'Advanced' | 'Proficient' }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud & K8s Platforms',
    description: 'Multi-cloud architectures, bare-metal clusters, and container orchestration.',
    skills: [
      { name: 'Kubernetes (K8s)', level: 'Expert' },
      { name: 'Amazon Web Services (AWS)', level: 'Expert' },
      { name: 'Bare-Metal Infrastructure', level: 'Expert' },
      { name: 'Linux Kernel & Systemd', level: 'Expert' },
      { name: 'Helm & Kustomize', level: 'Advanced' },
      { name: 'Google Cloud Platform (GCP)', level: 'Proficient' },
    ],
  },
  {
    title: 'GitOps & CI/CD Pipelines',
    description: 'Declarative infrastructure-as-code and automated canary delivery workflows.',
    skills: [
      { name: 'ArgoCD & Rollouts', level: 'Expert' },
      { name: 'Terraform & OpenTofu', level: 'Expert' },
      { name: 'GitHub Actions / GitLab CI', level: 'Expert' },
      { name: 'Docker / BuildKit', level: 'Expert' },
      { name: 'Ansible', level: 'Advanced' },
      { name: 'Crossplane', level: 'Proficient' },
    ],
  },
  {
    title: 'Data, MLOps & Vector Search',
    description: 'High-throughput real-time distributed data pipelines and AI retrieval engines.',
    skills: [
      { name: 'Qdrant / Milvus (Vector DBs)', level: 'Expert' },
      { name: 'Apache Kafka', level: 'Advanced' },
      { name: 'Ceph Object/Block Storage', level: 'Advanced' },
      { name: 'PostgreSQL & ClickHouse', level: 'Advanced' },
      { name: 'Redis / Dragonfly', level: 'Expert' },
      { name: 'Ollama & Model Serving', level: 'Advanced' },
    ],
  },
  {
    title: 'DevSecOps, Identity & Observability',
    description: 'Zero-trust networks, telemetric telemetry tracing, and secrets management.',
    skills: [
      { name: 'Prometheus & Grafana', level: 'Expert' },
      { name: 'HashiCorp Vault', level: 'Advanced' },
      { name: 'OpenTelemetry (OTel)', level: 'Advanced' },
      { name: 'Datadog & ELK Stack', level: 'Expert' },
      { name: 'Cilium & eBPF', level: 'Advanced' },
      { name: 'Trivy & Falco Security', level: 'Advanced' },
    ],
  },
  {
    title: 'Hardware & Networking',
    description: 'Datacenter hardware engineering, low-latency switching, and edge networks.',
    skills: [
      { name: 'BGP / OSPF / EVPN', level: 'Advanced' },
      { name: 'DNS & Cloudflare Enterprise', level: 'Expert' },
      { name: 'Dell PowerEdge & Supermicro', level: 'Expert' },
      { name: 'Enterprise SAN / NVMe-oF', level: 'Advanced' },
      { name: 'IPMI / Redfish Automation', level: 'Advanced' },
      { name: 'WireGuard & Mesh VPNs', level: 'Expert' },
    ],
  },
];

export default function SkillMatrix() {
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
                      {skill.level === 'Expert' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Expert" />
                      )}
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
