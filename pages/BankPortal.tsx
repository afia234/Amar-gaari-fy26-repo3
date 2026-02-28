
import React, { useEffect, useState } from 'react';
import { LoanLead } from '../types';
import { MockService } from '../services/mockService';
import { Button } from '../components/Button';
import { Download, Search } from 'lucide-react';

interface BankPortalProps {
  t: any;
}

export const BankPortal: React.FC<BankPortalProps> = ({ t }) => {
  const [leads, setLeads] = useState<LoanLead[]>([]);
  const [stats, setStats] = useState({ totalLeads: 0, pendingLeads: 0, approvedLeads: 0 });

  const refreshData = async () => {
    const l = await MockService.getLoanLeads();
    const s = MockService.getBankStats();
    setLeads(l);
    setStats(s);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: LoanLead['status']) => {
    await MockService.updateLoanLeadStatus(id, newStatus);
    refreshData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.bankPortal.title}</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.bankPortal.totalLeads}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.bankPortal.pendingLeads}</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.bankPortal.approvedLeads}</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.approvedLeads}</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">{t.bankPortal.recentLeads}</h3>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">{t.bankPortal.name}</th>
                <th className="px-6 py-3 font-medium">{t.bankPortal.phone}</th>
                <th className="px-6 py-3 font-medium">{t.bankPortal.income}</th>
                <th className="px-6 py-3 font-medium">{t.bankPortal.loanAmount}</th>
                <th className="px-6 py-3 font-medium">{t.bankPortal.status}</th>
                <th className="px-6 py-3 font-medium text-right">{t.bankPortal.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{lead.applicantName}</p>
                    <p className="text-xs text-gray-500">{lead.profession}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">BDT {lead.monthlyIncome.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">BDT {lead.loanAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      lead.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      lead.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {lead.status === 'Pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(lead.id, 'Contacted')}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 px-2 py-1 rounded hover:bg-blue-50"
                      >
                        {t.bankPortal.markContacted}
                      </button>
                    )}
                    {(lead.status === 'Pending' || lead.status === 'Contacted') && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(lead.id, 'Approved')}
                          className="text-green-600 hover:text-green-800 font-medium text-xs border border-green-200 px-2 py-1 rounded hover:bg-green-50"
                        >
                          {t.bankPortal.approve}
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(lead.id, 'Rejected')}
                          className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 px-2 py-1 rounded hover:bg-red-50"
                        >
                          {t.bankPortal.reject}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No loan leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
