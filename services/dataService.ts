
import { MarkRecord, ScoreRecord, BiasRecord } from '../types';

/**
 * В будущем здесь можно реализовать загрузку через fetch('/data/your_file.csv')
 * Для работы с 150к+ строк рекомендуется использовать PapaParse для стриминга данных
 */
export const loadRealData = async (): Promise<{marks: MarkRecord[], scores: ScoreRecord[], bias: BiasRecord[]}> => {
  // Пример логики для продакшена:
  // const response = await fetch('./data/marks.json');
  // return await response.json();
  
  // А пока используем оптимизированный генератор для тестов
  return generateMockData();
};

export const generateMockData = () => {
  const municipalities = [
    'г. Махачкала', 'г. Каспийск', 'г. Дербент', 'Агульский муниципальный район', 
    'Акушинский муниципальный район', 'Бабаюртовский муниципальный район'
  ];
  
  const subjects = ['Русский язык', 'Математика'];
  const grades = [4, 5];
  const years = [2021, 2022, 2023];
  
  const marks: MarkRecord[] = [];
  const scores: ScoreRecord[] = [];
  const bias: BiasRecord[] = [];

  years.forEach(year => {
    municipalities.forEach(muni => {
      const schoolCount = 10; // Для теста, в реальности будет из файла
      for (let s = 1; s <= schoolCount; s++) {
        const schoolName = `ОО №${s} (${muni})`;
        const login = `edu${year}${s}`;

        grades.forEach(grade => {
          subjects.forEach(subject => {
            marks.push({
              year, grade, subject, municipality: muni, login, schoolName,
              participants: 100,
              mark2: 5, mark3: 20, mark4: 50, mark5: 25
            });

            scores.push({
              year, grade, subject, municipality: muni, login, schoolName,
              participants: 100,
              scores: { 10: 5, 20: 10, 30: 85 } // Пример распределения
            });
          });
        });

        // Генерируем маркеры для некоторых школ
        if (s % 5 === 0) {
          bias.push({
            year, login, municipality: muni, schoolName,
            totalMarkers: 2,
            markers: { 'РУ 4': 1, 'МА 5': 1 }
          });
        }
      }
    });
  });

  return { marks, scores, bias };
};
