import { NextResponse } from 'next/server';
import { generateAgentCode } from '../../lib/agent-generator';

export const runtime = 'edge';

interface PreviewRequest {
  branch: string;
  config: {
    name: string;
    persona: string;
    tools: string[];
    initialPrompt: string;
  };
}

export async function POST(req: Request) {
  const { branch, config }: PreviewRequest = await req.json();
  
  try {
    // Generate the agent code for preview
    const code = generateAgentCode(config);
    
    return NextResponse.json({
      branch,
      previewUrl: `/preview/${branch}`,
      code,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate preview' }, 
      { status: 500 }
    );
  }
}
