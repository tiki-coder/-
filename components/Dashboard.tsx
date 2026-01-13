
import React, { useMemo } from 'react';
import { FilterState, MarkRecord, ScoreRecord, BiasRecord } from '../types';
import StatsCards from './StatsCards';
import Charts from './Charts';
import BiasSection from './BiasSection';
import SchoolList from './SchoolList';

interface DashboardProps {
  filters: FilterState;
  marks: MarkRecord[];
  scores: ScoreRecord[];
  bias: BiasRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ filters, marks, scores, bias }) => {
  // Memoize filtered data for performance (crucial for 150k+ rows)
  const filteredMarks = useMemo(() => {
    return marks.filter(d => {
      const yearMatch = d.year.toString() === filters.year;
      const gradeMatch = d.grade.toString() === filters.grade;
      const subjectMatch = d.subject === filters.subject;
      const muniMatch = filters.municipality === 'Все' || d.municipality === filters.municipality;
      const schoolMatch = filters.school === 'Все' || d.schoolName === filters.school;
      return yearMatch && gradeMatch && subjectMatch && muniMatch && schoolMatch;
    });
  }, [marks, filters]);

  const filteredScores = useMemo(() => {
    return scores.filter(d => {
      const yearMatch = d.year.toString() === filters.year;
      const gradeMatch = d.grade.toString() === filters.grade;
      const subjectMatch = d.subject === filters.subject;
      const muniMatch = filters.municipality === 'Все' || d.municipality === filters.municipality;
      const schoolMatch = filters.school === 'Все' || d.schoolName === filters.school;
      return yearMatch && gradeMatch && subjectMatch && muniMatch && schoolMatch;
    });
  }, [scores, filters]);

  const filteredBias = useMemo(() => {
    return bias.filter(d => {
      const yearMatch = d.year.toString() === filters.year;
      const muniMatch = filters.municipality === 'Все' || d.municipality === filters.municipality;
      const schoolMatch = filters.school === 'Все' || d.schoolName === filters.school;
      return yearMatch && muniMatch && schoolMatch;
    });
  }, [bias, filters]);

  const aggregateStats = useMemo(() => {
    if (filteredMarks.length === 0) return null;
    
    let totalParticipants = 0;
    let sumSuccess = 0;
    let sumQuality = 0;
    
    filteredMarks.forEach(m => {
      totalParticipants += m.participants;
      // Success rate is (3+4+5 marks)
      sumSuccess += (m.mark3 + m.mark4 + m.mark5) * m.participants / 100;
      // Quality rate is (4+5 marks)
      sumQuality += (m.mark4 + m.mark5) * m.participants / 100;
    });

    return {
      participants: totalParticipants,
      successRate: (sumSuccess / totalParticipants) * 100,
      qualityRate: (sumQuality / totalParticipants) * 100,
      count: filteredMarks.length
    };
  }, [filteredMarks]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Summary Cards */}
      <StatsCards 
        stats={aggregateStats} 
        filters={filters}
      />

      {/* Main Charts Row */}
      <Charts 
        filteredMarks={filteredMarks} 
        filteredScores={filteredScores} 
      />

      {/* Bias Analysis Section */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
          <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white uppercase">Признаки необъективности</h2>
        </div>
        <BiasSection 
          filters={filters} 
          biasData={bias} 
          filteredBias={filteredBias}
          marksData={marks}
        />
      </div>

      {/* Flagged Schools List */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
          <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white uppercase">
            Список ОО {filters.municipality !== 'Все' ? `по муниципалитету ${filters.municipality}` : 'региона'} с маркерами ({filters.year})
          </h2>
        </div>
        <SchoolList 
          filters={filters}
          biasData={filteredBias}
        />
      </div>
    </div>
  );
};

export default Dashboard;
