/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
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
