import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from './Button';
import { BANK_PARTNER } from '../constants';

const COLORS = ['#16a34a', '#86efac']; // Green shades

interface EMICalculatorProps {
  t: any;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ t }) => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9); // 9%
  const [tenure, setTenure] = useState(36); // months

  // Mock Eligibility State
  const [salary, setSalary] = useState('');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const emi = useMemo(() => {
    const r = interestRate / 12 / 100;
    const n = tenure;
    const result = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(result);
  }, [loanAmount, interestRate, tenure]);

  const totalInterest = Math.round((emi * tenure) - loanAmount);
  const totalPayment = Math.round(emi * tenure);

  const chartData = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];

  const checkEligibility = () => {
    const salaryNum = parseInt(salary);
    // Simple mock logic: EMI shouldn't exceed 40% of salary
    if (salaryNum && emi < (salaryNum * 0.4)) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t.finance.calculator}</h2>
        <div className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-semibold border border-green-100">
          Financed by {BANK_PARTNER}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t.finance.amount} (BDT)</label>
              <span className="font-bold text-green-600">৳{loanAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="10000000" 
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <span className="font-bold text-green-600">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="20" 
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t.finance.tenure}</label>
              <span className="font-bold text-green-600">{tenure} Months</span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="84" 
              step="6"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          {/* Eligibility Check Mini-Form */}
          <div className="pt-6 border-t mt-4">
            <h3 className="font-semibold text-gray-800 mb-3">{t.finance.eligibility}</h3>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder={t.finance.income} 
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <Button onClick={checkEligibility} variant="secondary" className="whitespace-nowrap">
                {t.finance.checkBtn}
              </Button>
            </div>
            {isEligible !== null && (
              <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${isEligible ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isEligible 
                  ? "✅ Great! You are likely eligible for this loan." 
                  : "⚠️ Your salary might be too low for this loan amount."}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6">
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mb-1">{t.finance.emi}</p>
            <p className="text-3xl font-extrabold text-green-600">৳{emi.toLocaleString()}</p>
          </div>

          <div className="w-full mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.finance.interest}</span>
              <span className="font-semibold">৳{totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.finance.payment}</span>
              <span className="font-semibold">৳{totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
