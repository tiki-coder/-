
import React, { useMemo } from 'react';
import { FilterState, MarkRecord } from '../types';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  marksData: MarkRecord[];
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ filters, onFilterChange, marksData, darkMode, toggleTheme }) => {
  // Extract unique filter options from marksData
  const options = useMemo(() => {
    const years = Array.from(new Set(marksData.map(d => d.year))).sort((a, b) => b - a);
    const grades = Array.from(new Set(marksData.map(d => d.grade))).sort();
    const subjects = Array.from(new Set(marksData.map(d => d.subject))).sort();
    
    const municipalities = Array.from(new Set(marksData.map(d => d.municipality))).sort();
    
    const schools = filters.municipality === 'Все' 
      ? Array.from(new Set(marksData.map(d => d.schoolName))).sort()
      : Array.from(new Set(marksData.filter(d => d.municipality === filters.municipality).map(d => d.schoolName))).sort();

    return { years, grades, subjects, municipalities, schools };
  }, [marksData, filters.municipality]);

  const selectClass = "block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight uppercase">Анализ результатов ВПР</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase">Мониторинговая платформа</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 items-end">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">Год</label>
              <select value={filters.year} onChange={e => onFilterChange({ year: e.target.value })} className={selectClass}>
                {options.years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">Класс</label>
              <select value={filters.grade} onChange={e => onFilterChange({ grade: e.target.value })} className={selectClass}>
                {options.grades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="hidden sm:block">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">Предмет</label>
              <select value={filters.subject} onChange={e => onFilterChange({ subject: e.target.value })} className={selectClass}>
                {options.subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">Муниципалитет</label>
              <select value={filters.municipality} onChange={e => onFilterChange({ municipality: e.target.value })} className={selectClass}>
                <option value="Все">Все регионы</option>
                {options.municipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">Организация (ОО)</label>
              <select value={filters.school} onChange={e => onFilterChange({ school: e.target.value })} className={selectClass}>
                <option value="Все">Все школы</option>
                {options.schools.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Сменить тему"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
