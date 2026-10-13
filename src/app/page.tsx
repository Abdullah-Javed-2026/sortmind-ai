'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroHeader } from '@/components/HeroHeader';
import { RealAppContainer } from '@/components/real/RealAppContainer';
import { WorkflowSection } from '@/components/WorkflowSection';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { ArchitectureRoadmap } from '@/components/ArchitectureRoadmap';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const scrollToWorkspace = () => {
    const el = document.getElementById('workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Frosted Glass Navbar (Zush Style) */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <div className="container">
          
          {/* 2. Hero Section */}
          <HeroHeader onScrollToWorkspace={scrollToWorkspace} />

          {/* 3. Real Interactive File Organizer Workspace & In-Memory ZIP Generator */}
          <RealAppContainer />

          {/* 4. How It Works Workflow (01, 02, 03) */}
          <WorkflowSection />

          {/* 5. Built for People Who Handle Files (Personas & Capabilities) */}
          <FeaturesGrid />

          {/* 6. Strategic Architecture & Local Privacy Roadmap */}
          <ArchitectureRoadmap />
          
        </div>
      </main>

      {/* 7. Centered Clean Footer */}
      <Footer />
    </div>
  );
}
