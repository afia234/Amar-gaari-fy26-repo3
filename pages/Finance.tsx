
import React, { useState, useMemo } from 'react';
import { Button } from '../components/Button';
import { FINANCING_OPTIONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, ExternalLink, ShieldCheck, Banknote, X } from 'lucide-react';
import { MockService } from '../services/mockService';

const COLORS = ['#16a34a', '#F1F5F9']; // Green & Slate

interface FinanceProps {
  t: any;
}

export const Finance: React.FC<FinanceProps> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<'CITY' | 'EBL'>('CITY');
  
  // Calculator State
  const cityConstraints = FINANCING_OPTIONS.CITY_BANK.constraints;
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(36);
  const [interestRate, setInterestRate] = useState(cityConstraints.interestRate);

  // Eligibility State
  const [profession, setProfession] = useState('Salaried');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState<{status: 'pass' | 'fail' | null, msg: string}>({ status: null, msg: '' });

  // Document State
  const [showDocs, setShowDocs] = useState(false);

  // Apply Modal State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EMI Calculation
  const emi = useMemo(() => {
    const r = interestRate / 12 / 100;
    const n = tenure;
    return Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, tenure, interestRate]);

  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  const chartData = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];

  const checkCityEligibility = () => {
    const inc = parseInt(monthlyIncome) || 0;
    const ag = parseInt(age) || 0;
    const exp = parseFloat(experience) || 0;
    const criteria = FINANCING_OPTIONS.CITY_BANK.eligibility;

    if (ag < criteria.minAge || ag > criteria.maxAge) {
      setEligibilityResult({ status: 'fail', msg: `Age must be between ${criteria.minAge} and ${criteria.maxAge} years.` });
      return;
    }

    if (profession === 'Salaried') {
      if (inc < criteria.income.salaried) {
        setEligibilityResult({ status: 'fail', msg: `Minimum income for Salaried Executives is BDT ${criteria.income.salaried.toLocaleString()}` });
        return;
      }
      if (exp < 1) { // Simplified from "1 year total, 6mo current"
        setEligibilityResult({ status: 'fail', msg: "Minimum 1 year total service experience required." });
        return;
      }
    } else {
      // Business / Professional / Landlord
      if (inc < criteria.income.others) {
        setEligibilityResult({ status: 'fail', msg: `Minimum income for this segment is BDT ${criteria.income.others.toLocaleString()}` });
        return;
      }
      if (profession === 'Businessman' && exp < 2) {
        setEligibilityResult({ status: 'fail', msg: "Minimum 2 years business involvement required." });
        return;
      }
      if (profession === 'Professional' && exp < 1) {
        setEligibilityResult({ status: 'fail', msg: "Minimum 1 year practice required." });
        return;
      }
    }

    setEligibilityResult({ status: 'pass', msg: "Congratulations! You meet the basic eligibility criteria." });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await MockService.createLoanLead({
      id: `lead_${Date.now()}`,
      applicantName,
      phone: applicantPhone,
      profession,
      monthlyIncome: parseInt(monthlyIncome),
      loanAmount: loanAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });

    setIsSubmitting(false);
    setShowApplyModal(false);
    alert(t.finance.applySuccess);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t.finance.title}</h1>
          <p className="text-gray-500 mt-2">{t.finance.subtitle}</p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('CITY')}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'CITY' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Banknote size={20} /> {t.finance.tabCity}
            </button>
            <button 
              onClick={() => setActiveTab('EBL')}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'EBL' ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Banknote size={20} /> {t.finance.tabEbl}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'CITY' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            {/* Intro Banner - Keeping Red for City Bank Brand Identity */}
            <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold mb-2">Your Wheel is now Your Will</h2>
                 <p className="text-green-100 max-w-2xl">Unlock your Car Dreams with City Bank Auto Loan. Financing up to 70% for Hybrid/Electric vehicles with no hidden charges.</p>
               </div>
               <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Col: Calculator */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Banknote size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.finance.calculator}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-medium">{t.finance.amount}</span>
                      <span className="text-green-600 font-bold">BDT {loanAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range"
                      min={cityConstraints.minLoan}
                      max={cityConstraints.maxLoan}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{cityConstraints.minLoan/100000}L</span>
                      <span>{cityConstraints.maxLoan/100000}L</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-medium">{t.finance.tenure}</span>
                      <span className="text-green-600 font-bold">{tenure} Months</span>
                    </div>
                    <input 
                      type="range"
                      min={cityConstraints.minTenure}
                      max={cityConstraints.maxTenure}
                      step={6}
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                    <div className="h-40 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
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
                    <p className="text-sm text-gray-500">{t.finance.emi}</p>
                    <p className="text-3xl font-extrabold text-gray-900 mt-1">BDT {emi.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-2">Est. Interest Rate: {interestRate}%</p>
                  </div>
                </div>
              </div>

              {/* Right Col: Eligibility */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.finance.eligibility}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.finance.profession}</label>
                    <select 
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                    >
                      <option value="Salaried">{t.finance.salaried}</option>
                      <option value="Businessman">{t.finance.business}</option>
                      <option value="Professional">{t.finance.professional}</option>
                      <option value="Landlord">{t.finance.landlord}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.finance.age}</label>
                      <input 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 30"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.finance.exp}</label>
                      <input 
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.finance.income}</label>
                    <input 
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <Button onClick={checkCityEligibility} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {t.finance.checkBtn}
                  </Button>

                  {eligibilityResult.status && (
                    <div className={`p-4 rounded-lg flex flex-col gap-3 ${eligibilityResult.status === 'pass' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <div className="flex items-start gap-3">
                        {eligibilityResult.status === 'pass' ? <CheckCircle className="shrink-0" /> : <AlertCircle className="shrink-0" />}
                        <p className="text-sm font-medium">{eligibilityResult.msg}</p>
                      </div>
                      
                      {eligibilityResult.status === 'pass' && (
                        <Button 
                          onClick={() => setShowApplyModal(true)} 
                          className="w-full mt-2 shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-0.5" 
                          variant="primary"
                        >
                          {t.finance.applyBtn}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => setShowDocs(!showDocs)}
                className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">?</div>
                  <span className="font-bold text-gray-900">{t.finance.docs}</span>
                </div>
                {showDocs ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {showDocs && (
                <div className="p-6 grid md:grid-cols-2 gap-8 border-t border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">{t.finance.generalDocs}</h4>
                    <ul className="space-y-2">
                      {FINANCING_OPTIONS.CITY_BANK.documents.common.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">For {profession}</h4>
                    <ul className="space-y-2">
                      {(FINANCING_OPTIONS.CITY_BANK.documents.segments[profession as keyof typeof FINANCING_OPTIONS.CITY_BANK.documents.segments] || []).map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* EBL Tab */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-yellow-500 p-8 text-white">
                 <h2 className="text-3xl font-bold">{FINANCING_OPTIONS.EBL.name}</h2>
                 <p className="opacity-90 mt-2">{FINANCING_OPTIONS.EBL.description}</p>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {FINANCING_OPTIONS.EBL.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <CheckCircle className="text-yellow-600" />
                      <span className="font-medium text-gray-800">{feat}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                    We have partnered with Eastern Bank PLC to bring you competitive auto loan rates. 
                    Please visit their official portal for the latest interest rates and application process.
                  </p>
                  <a 
                    href={FINANCING_OPTIONS.EBL.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                  >
                    Apply via EBL Portal <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">{t.finance.applyBtn}</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 hover:bg-gray-200 rounded-full">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. 01700000000"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                 <div className="flex justify-between">
                   <span>Loan Amount:</span>
                   <span className="font-bold">BDT {loanAmount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Income:</span>
                   <span className="font-bold">BDT {parseInt(monthlyIncome).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Profession:</span>
                   <span className="font-bold">{profession}</span>
                 </div>
              </div>

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
