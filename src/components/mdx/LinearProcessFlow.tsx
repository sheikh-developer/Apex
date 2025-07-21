import React from 'react';

interface LinearProcessFlowProps {
  steps: { title: string; description: string; }[];
}

const LinearProcessFlow: React.FC<LinearProcessFlowProps> = ({ steps }) => {
  return (
    <div className="linear-process-flow">
      {steps.map((step, index) => (
        <div key={index} className="process-step">
          <div className="step-number">{index + 1}</div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinearProcessFlow;
