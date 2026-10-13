import React from 'react';
import { HeroHeader } from '@/components/HeroHeader';
import { WorkflowSection } from '@/components/WorkflowSection';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { ArchitectureRoadmap } from '@/components/ArchitectureRoadmap';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <div className="container" style={{ maxWidth: '1280px', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
          
          {/* 1. Split Hero Section with Left Sidebar Navigation */}
          <HeroHeader />

          {/* 3. How It Works Workflow (01, 02, 03) */}
          <WorkflowSection />

          {/* 4. Built for People Who Handle Files (Personas & Capabilities) */}
          <FeaturesGrid />

          {/* 5. Strategic Architecture & Local Privacy Roadmap */}
          <ArchitectureRoadmap />
          
        </div>
      </main>

      {/* 7. Centered Clean Footer */}
      <Footer />
    </div>
  );
}
