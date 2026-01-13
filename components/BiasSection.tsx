
import React, { useMemo } from 'react';
import { FilterState, BiasRecord, MarkRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface BiasSectionProps {
  filters: FilterState;
  biasData: BiasRecord[];
  filteredBias: BiasRecord[];
  marksData: MarkRecord[];
}

const BiasSection: React.FC<BiasSectionProps> = ({ filters, biasData, filteredBias, marksData }) => {
  const currentYear = parseInt(filters.year);

  // Analysis for the selected school (if one is selected)
  const schoolBias = useMemo(() => {
    if (filters.school === 'Все') return null;
    return biasData.find(d => d.schoolName === filters.school && d.year === currentYear);
  }, [biasData, filters.school, currentYear]);

  // Check if this school was in bias in last 3 years
  const historyBias = useMemo(() => {
    if (filters.school === 'Все') return [];
    return biasData.filter(d => 
      d.schoolName === filters.school && 
      d.year >= currentYear - 2 && 
      d.year < currentYear &&
      d.totalMarkers > 0
    );
  }, [biasData, filters.school, currentYear]);

  // Calculate percentage of biased schools in the municipality for current and last 2 years
  const statsByYear = useMemo(() => {
    const years = [currentYear - 2, currentYear - 1, currentYear];
    return years.map(yr => {
      const muniSchoolsInYear = Array.from(new Set(
        marksData.filter(m => m.year === yr && (filters.municipality === 'Все' || m.municipality === filters.municipality))
        .map(m => m.login)
      ));
      
      const biasedSchoolsInYear = Array.from(new Set(
        biasData.filter(b => b.year === yr && b.totalMarkers > 0 && (filters.municipality === 'Все' || b.municipality === filters.municipality))
        .map(b => b.login)
      ));

      const total = muniSchoolsInYear.length;
      const count = biasedSchoolsInYear.length;
      const percentage = total > 0 ? (count / total) * 100 : 0;

      return { year: yr, percentage: Number(percentage.toFixed(1)) };
    });
  }, [biasData, marksData, filters.municipality, currentYear]);

  const cardStyle = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm min-h-[340px]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* School Analysis Card */}
      <div className={cardStyle}>
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Анализ выбранной школы ({filters.year})</span>
        </div>
        
        {filters.school === 'Все' ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 space-y-3">
            <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm italic">Выберите конкретную школу для детального анализа маркеров</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative">
              <span className="text-6xl font-black text-orange-500 drop-shadow-sm">{schoolBias?.totalMarkers || 0}</span>
              {schoolBias?.totalMarkers && schoolBias.totalMarkers > 0 && (
                <div className="absolute -top-2 -right-4 animate-ping h-3 w-3 rounded-full bg-orange-400 opacity-75"></div>
              )}
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] mt-2">Количество маркеров</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {schoolBias?.markers && Object.entries(schoolBias.markers).map(([subject, count]) => (
                <span key={subject} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                  {subject}: <span className="text-orange-500">{count}</span>
                </span>
              ))}
              {(!schoolBias || schoolBias.totalMarkers === 0) && (
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  Маркеры отсутствуют
                </span>
              )}
            </div>

            {historyBias.length > 0 && (
              <div className="mt-10 w-full p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">
                  В прошлые годы ({historyBias.map(b => b.year).join(', ')}) школа имела признаки необъективности.
                </p>
              </div>
            )}
          </div>
        )}
        <div className="mt-auto pt-8 flex justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">сводные данные</span>
        </div>
      </div>

      {/* Municipality Stats Card */}
      <div className={cardStyle}>
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Доля ОО с признаками необъективности (%) по муниципалитету</span>
        </div>
        <div className="h-[220px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsByYear} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis hide />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]} barSize={50}>
                {statsByYear.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.year === currentYear ? '#f97316' : '#94a3b8'} fillOpacity={0.8} />
                ))}
                <LabelList dataKey="percentage" position="top" formatter={(v: any) => `${v}%`} style={{ fontSize: '12px', fontWeight: 'bold', fill: '#64748b' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BiasSection;
