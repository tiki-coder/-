
import React, { useMemo } from 'react';
import { FilterState, BiasRecord } from '../types';

interface SchoolListProps {
  filters: FilterState;
  biasData: BiasRecord[];
}

const SchoolList: React.FC<SchoolListProps> = ({ filters, biasData }) => {
  const flaggedSchools = useMemo(() => {
    return biasData.filter(d => d.totalMarkers > 0).sort((a, b) => b.totalMarkers - a.totalMarkers);
  }, [biasData]);

  if (flaggedSchools.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full text-emerald-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">В этом году в выбранном районе школы с признаками необъективности отсутствуют.</h3>
        <p className="text-slate-500">Показатели объективности оценивания находятся в пределах нормы.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Список образовательных организаций</span>
        <span className="px-2 py-0.5 bg-red-500 text-[10px] font-bold text-white rounded">Найдено школ: {flaggedSchools.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Наименование организации</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Маркеров</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Дисциплины</th>
            </tr>
          </thead>
          <tbody>
            {flaggedSchools.map((school, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">{school.schoolName}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase mt-1">{school.municipality}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-red-500 text-white rounded-full text-xs font-black shadow-lg shadow-red-500/30">
                    {school.totalMarkers}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(school.markers).map(([subj, count]) => (
                      <span key={subj} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded uppercase">
                        {subj}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolList;
