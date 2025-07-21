/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BudgetContextType {
  monthlyBudget: number;
  currentSpend: number;
  currency: string;
  alertThresholds: number[];
  setBudget: (amount: number, currency?: string) => void;
  addSpend: (amount: number) => void;
  checkAlerts: () => number[];
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [alertThresholds] = useState([25, 50, 75, 90]);

  const setBudget = (amount: number, currency = 'USD') => {
    setMonthlyBudget(amount);
    setCurrency(currency);
    setCurrentSpend(0);
  };

  const addSpend = (amount: number) => {
    setCurrentSpend(prev => prev + amount);
  };

  const checkAlerts = () => {
    if (monthlyBudget <= 0) return [];

    const percentage = (currentSpend / monthlyBudget) * 100;
    return alertThresholds.filter(t => percentage >= t);
  };

  return (
    <BudgetContext.Provider 
      value={{
        monthlyBudget,
        currentSpend,
        currency,
        alertThresholds,
        setBudget,
        addSpend,
        checkAlerts
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
