import React from "react";
import { StepCard, StepCardItem } from "../molecules/ContentCard";
import { SectionHeader } from "../molecules/SectionHeader";

export interface WorkflowGridProps {
  steps: StepCardItem[];
  header?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
  className?: string;
}

export function WorkflowGrid({ steps, header, className = "" }: WorkflowGridProps) {
  return (
    <div className={`w-full ${className}`}>
      {header && (
        <SectionHeader
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          className="mb-12"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <StepCard key={step.step} item={step} />
        ))}
      </div>
    </div>
  );
}

