
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { MarkRecord, ScoreRecord, BiasRecord, FilterState } from './types';
import { generateMockData } from './services/dataService';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [marksData, setMarksData] = useState<MarkRecord[]>([]);
  const [scoresData, setScoresData] = useState<ScoreRecord[]>([]);
  const [biasData, setBiasData] = useState<BiasRecord[]>([]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    year: '2023',
    grade: '4',
    subject: 'Русский язык',
    municipality: 'Все',
    school: 'Все'
  });

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Simulate loading huge data
    const loadData = async () => {
      setLoading(true);
      // In a real app, we would fetch or process Excel files here.
      // For this demo, we generate high-performance mock data structures.
      const data = generateMockData();
      setMarksData(data.marks);
      setScoresData(data.scores);
      setBiasData(data.bias);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      // Reset school if municipality changes
      if (newFilters.municipality && newFilters.municipality !== prev.municipality) {
        updated.school = 'Все';
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        marksData={marksData}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />
      
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-lg text-slate-500 font-medium">Загрузка данных и оптимизация дашборда...</p>
          </div>
        ) : (
          <Dashboard 
            filters={filters}
            marks={marksData}
            scores={scoresData}
            bias={biasData}
          />
        )}
      </main>

      <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
        <p>© 2024 Аналитическая система ВПР • Облачное решение</p>
        <p className="mt-1">Оптимизировано для работы с наборами данных свыше 150,000 строк</p>
      </footer>
    </div>
  );
};

export default App;
