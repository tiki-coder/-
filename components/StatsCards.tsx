
import React from 'react';
import { FilterState } from '../types';

interface StatsCardsProps {
  stats: {
    participants: number;
    successRate: number;
    qualityRate: number;
  } | null;
  filters: FilterState;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, filters }) => {
  const cardBase = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.02] duration-300";
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Selected Entity */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Выбранная ОО</span>
          <h3 className="text-lg font-bold truncate text-slate-800 dark:text-white">
            {filters.school === 'Все' ? 'Весь регион' : filters.school}
          </h3>
          <p className="text-xs text-slate-500">{filters.municipality === 'Все' ? 'Все муниципалитеты' : filters.municipality}</p>
        </div>
      </div>

      {/* Participants */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Участников</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats?.participants.toLocaleString() || '0'}</h3>
          </div>
          <p className="text-xs text-slate-500">человек приняло участие</p>
        </div>
      </div>

      {/* Success Rate */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Успеваемость</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats?.successRate.toFixed(1) || '0.0'}%</h3>
          </div>
          <p className="text-xs text-slate-500">Доля отметок 3, 4 и 5</p>
        </div>
      </div>

      {/* Quality Rate */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-xl">
            <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Качество (4+5)</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats?.qualityRate.toFixed(1) || '0.0'}%</h3>
          </div>
          <p className="text-xs text-slate-500">Доля отметок 4 и 5</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
