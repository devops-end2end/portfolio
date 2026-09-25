'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type RolePersona = 'manager' | 'architect' | 'master';

interface HeroProps {
  currentPersona: RolePersona;
  onPersonaChange: (persona: RolePersona) => void;
  onOpenResumeModal?: () => void;
}

const personaContent: Record<
  RolePersona,
  {
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }
> = {
  manager: {
    title: 'Senior Manager / Platform Engineering Lead',
    subtitle: 'Strategic Leadership & Platform Scale',
    description:
      'Proven engineering leader scaling high-velocity platform teams, multi-region Kubernetes infrastructure, and developer productivity tooling across global environments.',
    highlights: ['99.99% Availability', 'Multi-tenant Governance', 'Team Mentorship & Growth', 'FinOps & Cost Optimization'],
  },
  architect: {
    title: 'Principal Infrastructure Architect',
    subtitle: 'Cloud-Native Systems & Distributed Architecture',
    description:
      'Hands-on systems architect specializing in GitOps, bare-metal & hybrid-cloud Kubernetes, vector search infra, MLOps, low-latency networking, and secure enterprise infrastructure.',
    highlights: ['Kubernetes & GitOps (ArgoCD)', 'Distributed Storage & Ceph', 'Bare-Metal & Hybrid Cloud', 'Vector DBs & MLOps Infra'],
  },
  master: {
    title: 'Platform Engineering Leader & Infrastructure Architect',
    subtitle: 'End-to-End Enterprise Platform & Systems Mastery',
    description:
      'Bridging executive organizational strategy and deep systems architecture. Over a decade of designing, deploying, and leading mission-critical infrastructure at scale.',
    highlights: ['Multi-Cloud & Hybrid K8s', 'GitOps & Zero-Trust Security', 'Engineering Org Leadership', 'Vector Search & Observability'],
  },
};

export default function Hero({ currentPersona, onPersonaChange, onOpenResumeModal }: HeroProps) {
  const content = personaContent[currentPersona];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-mono mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>🟢 Available for Senior Infrastructure / Platform Lead Roles</span>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Select Perspective</div>
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur">
            <button
              onClick={() => onPersonaChange('manager')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPersona === 'manager'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              [ Senior Manager / Platform Lead ]
            </button>
            <button
              onClick={() => onPersonaChange('architect')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPersona === 'architect'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              [ Infrastructure Architect ]
            </button>
            <button
              onClick={() => onPersonaChange('master')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPersona === 'master'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              [ Full Master View ]
            </button>
          </div>
        </div>

        {/* Dynamic Proposition */}
        <motion.div
          key={currentPersona}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-4xl"
        >
          <span className="text-sm font-mono tracking-widest text-zinc-400 uppercase">
            {content.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {content.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {content.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 text-xs font-mono rounded-md border border-zinc-700 bg-zinc-900/60 text-zinc-300"
              >
                {highlight}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {onOpenResumeModal && (
            <button
              onClick={onOpenResumeModal}
              className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Download Tailored Resume
            </button>
          )}
          <a
            href="#case-studies"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/80 text-white hover:border-zinc-500 transition-colors font-medium"
          >
            View Architecture Cases
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-medium"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-medium"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
