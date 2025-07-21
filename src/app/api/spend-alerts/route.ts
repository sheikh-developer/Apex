import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SpendAlertRequest {
  projectId: string;
  budgetAmount: number;
  currency?: string;
}

export async function POST(req: Request) {
  const { projectId, budgetAmount, currency = 'USD' }: SpendAlertRequest = await req.json();

  try {
    // In a real implementation, this would connect to your billing system
    return NextResponse.json({
      status: 'success',
      message: `Spend alerts configured for project ${projectId}`,
      budget: {
        amount: budgetAmount,
        currency,
        alertsEnabled: true
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to configure spend alerts' }, 
      { status: 500 }
    );
  }
}
