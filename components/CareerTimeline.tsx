'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CareerRole {
  company: string;
  role: string;
  duration: string;
  location?: string;
  tags?: ('manager' | 'architect')[];
  summary?: string;
  achievements: string[];
  technologies?: string[];
}

interface CareerTimelineProps {
  careerData?: CareerRole[];
  activePersona?: 'manager' | 'architect' | 'master';
}

const defaultCareerData: CareerRole[] = [
  {
    company: 'adMarketplace',
    role: 'Senior Director / Principal Infrastructure Architect',
    duration: '2021 — Present',
    location: 'New York, NY',
    tags: ['manager', 'architect'],
    summary:
      'Led platform engineering and cloud infrastructure operations delivering multi-billion auction requests per day.',
    achievements: [
      'Architected and implemented multi-region bare-metal Kubernetes and AWS hybrid infrastructure powering low-latency search bidding pipelines.',
      'Directed engineering teams across Platform, SRE, and DevSecOps domains, improving DORA deployment frequency by 400%.',
      'Engineered Ceph distributed storage cluster and self-hosted vector database infrastructure for sub-10ms semantic retrieval.',
      'Reduced enterprise infrastructure expenditure by over $1.2M annually through automated FinOps controls and workload bin-packing.',
    ],
    technologies: ['Kubernetes', 'AWS', 'Ceph', 'ArgoCD', 'Terraform', 'Prometheus', 'Kafka', 'Golang'],
  },
  {
    company: 'Vanguard',
    role: 'Lead Cloud Infrastructure Architect',
    duration: '2018 — 2021',
    location: 'Malvern, PA',
    tags: ['architect', 'manager'],
    summary:
      'Spearheaded enterprise cloud transformation initiatives across multi-account AWS landing zones for financial systems.',
    achievements: [
      'Designed zero-trust network topology and infrastructure-as-code foundations across 200+ AWS organizational accounts.',
      'Established enterprise GitOps standards with ArgoCD and automated canary analysis using Prometheus metrics.',
      'Mentored and upskilled 35+ engineers on cloud-native software architecture, containerization, and immutable deployments.',
    ],
    technologies: ['AWS', 'EKS', 'ArgoCD', 'Terraform', 'Datadog', 'Python', 'Vault'],
  },
  {
    company: 'Canon USA',
    role: 'Senior Systems & Network Infrastructure Engineer',
    duration: '2014 — 2018',
    location: 'Melville, NY',
    tags: ['architect'],
    summary:
      'Engineered mission-critical enterprise virtualization, core BGP/OSPF networking, and business continuity systems.',
    achievements: [
      'Maintained 99.999% uptime for core enterprise datacenter operations, SAN fabric, and multi-site replication.',
      'Automated provisioning workflows for Linux and Windows virtualization clusters using Ansible and Bash.',
      'Designed and executed disaster recovery runbooks with sub-15 minute RTO/RPO failovers.',
    ],
    technologies: ['Linux', 'VMware', 'Cisco BGP/OSPF', 'SAN/NAS', 'Ansible', 'Bash'],
  },
];

export default function CareerTimeline({
  careerData = defaultCareerData,
  activePersona = 'master',
}: CareerTimelineProps) {
  const [selectedTag, setSelectedTag] = useState<'all' | 'manager' | 'architect'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const effectiveFilter =
    selectedTag !== 'all'
      ? selectedTag
      : activePersona === 'master'
      ? 'all'
      : activePersona;

  const filteredJobs = careerData.filter((job) => {
    if (effectiveFilter === 'all') return true;
    return job.tags ? job.tags.includes(effectiveFilter) : true;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-16 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Career Experience</h2>
            <p className="text-zinc-400 mt-2 text-base">
              Chronological leadership and architectural impact across enterprise environments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 mr-1">Filter Roles:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                effectiveFilter === 'all'
                  ? 'border-zinc-500 bg-zinc-800 text-white'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedTag('manager')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                effectiveFilter === 'manager'
                  ? 'border-blue-500 bg-blue-950/40 text-blue-300'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
              }`}
            >
              Manager
            </button>
            <button
              onClick={() => setSelectedTag('architect')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                effectiveFilter === 'architect'
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
              }`}
            >
              Architect
            </button>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-8">
          {filteredJobs.map((job, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                key={`${job.company}-${idx}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="relative pl-6 md:pl-8"
              >
                {/* Node dot */}
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-zinc-900 bg-blue-500" />

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 md:p-6 transition-colors hover:border-zinc-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{job.role}</h3>
                      <div className="text-blue-400 font-medium text-sm mt-0.5">{job.company}</div>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 sm:text-right">
                      <div>{job.duration}</div>
                      {job.location && <div className="text-zinc-500">{job.location}</div>}
                    </div>
                  </div>

                  {job.summary && (
                    <p className="text-sm text-zinc-300 mt-3 leading-relaxed">{job.summary}</p>
                  )}

                  {/* Role Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-0.5 rounded font-mono uppercase ${
                            tag === 'manager'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleExpand(idx)}
                      className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4"
                    >
                      {isExpanded ? 'Hide Details ▲' : 'Show Details & Achievements ▼'}
                    </button>
                  </div>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-5 pt-4 border-t border-zinc-800/80 space-y-4"
                      >
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Key Achievements & Impact
                          </h4>
                          <ul className="space-y-2">
                            {job.achievements.map((achievement, aIdx) => (
                              <li key={aIdx} className="text-sm text-zinc-300 flex items-start gap-2">
                                <span className="text-blue-400 mt-1">▸</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {job.technologies && job.technologies.length > 0 && (
                          <div className="pt-2">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                              Tech Stack Utilized
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {job.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
