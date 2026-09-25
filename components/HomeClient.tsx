'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Hero, { RolePersona } from '@/components/Hero';
import CareerTimeline from '@/components/CareerTimeline';
import SkillMatrix from '@/components/SkillMatrix';
import CommandPalette from '@/components/CommandPalette';
import ResumeGenerator from '@/components/ResumeGenerator';
import CaseStudies from '@/components/CaseStudies';
import { CareerData } from '@/lib/data';

interface HomeClientProps {
  careerData: CareerData;
}

export default function HomeClient({ careerData }: HomeClientProps) {
  const [activePersona, setActivePersona] = useState<RolePersona>('master');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col">
      {/* Global Command Palette */}
      <CommandPalette />

      {/* Hero Section with Role Persona Switcher */}
      <Hero
        careerData={careerData}
        currentPersona={activePersona}
        onPersonaChange={setActivePersona}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Case Studies */}
      <div id="case-studies">
        <CaseStudies caseStudies={careerData.case_studies} />
      </div>

      {/* Career Timeline */}
      <CareerTimeline 
        careerData={careerData.experience} 
        activePersona={activePersona} 
      />

      {/* Grouped Skills Matrix */}
      <SkillMatrix skills={careerData.skills} />

      {/* Tailored Resume Generator Modal */}
      {isResumeModalOpen && (
        <ResumeGenerator
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          defaultPersona={activePersona}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>Next.js Static Export (SSG) • Deployed via GitHub Actions</div>
          <div className="flex gap-4">
            <Link href="/topology" className="hover:text-zinc-300 transition-colors">
              System Topology View →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
