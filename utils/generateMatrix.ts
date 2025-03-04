import generateRandomStructure from "./generateRandomStructure";

function generateMatrix(year: number) {
  function getDaysInMonth(month: number, year: number) {
      return new Date(year, month, 0).getDate();
  }

  // Инициализация матрицы
  let matrix = [];

  for (let month = 1; month <= 12; month++) {
      let daysInMonth = getDaysInMonth(month, year);
      let days = [];
      let days_statistis = 0;
      let hours = 0;

      // Генерация данных для каждого дня месяца
      for (let day = 1; day <= 31; day++) {
          if (day <= daysInMonth) {
              let result = generateRandomStructure();
              if (result.hours !== null) {
                  days.push(result.hours.toString());
                  days_statistis++;
                  hours += result.hours;
              } else if (result.stay_out) {
                  days.push('О');
              } else if (result.sick_leave) {
                  days.push('Б');
              }
          } else {
              // Если день выходит за пределы месяца, добавляем 'Х'
              days.push('Х');
          }
      }

      // Добавляем данные месяца в матрицу
      matrix.push({
          id: month,
          days: days,
          days_statistis: days_statistis,
          hours: hours
      });
  }

  return matrix;
}


export default generateMatrix
