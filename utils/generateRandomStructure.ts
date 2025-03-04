function generateRandomStructure() {
  // Получаем данные из localStorage или инициализируем их, если они отсутствуют
  let history = JSON.parse(localStorage.getItem('history')) || {
      stay_out_count: 0,
      sick_leave_count: 0,
      last_stay_out: false,
      last_sick_leave: false,
      hours_between: 0, // Счетчик для отслеживания количества hours между stay_out и sick_leave
      min_hours: 5, // Минимальное количество hours между stay_out и sick_leave
      max_hours: 20 // Максимальное количество hours между stay_out и sick_leave
  };

  let hours = null;
  let stay_out = false;
  let sick_leave = false;

  // Если есть активная последовательность stay_out или sick_leave, продолжаем её
  if (history.stay_out_count > 0) {
      stay_out = true;
      history.stay_out_count--;
  } else if (history.sick_leave_count > 0) {
      sick_leave = true;
      history.sick_leave_count--;
  } else {
      // Если нет активной последовательности, проверяем, можно ли начать новую
      if (history.hours_between >= history.min_hours) {
          // Решаем, начать ли новую последовательность stay_out или sick_leave
          if (Math.random() < 0.5) {
              stay_out = true;
              history.stay_out_count = Math.floor(Math.random() * 4) + 2; // От 2 до 5 раз
          } else {
              sick_leave = true;
              history.sick_leave_count = Math.floor(Math.random() * 4) + 2; // От 2 до 5 раз
          }
          history.hours_between = 0; // Сбрасываем счетчик hours
      } else {
          // Генерируем hours
          hours = Math.floor(Math.random() * 12) + 1;
          history.hours_between++;
      }
  }

  // Если stay_out или sick_leave true, hours должен быть null
  if (stay_out || sick_leave) {
      hours = null;
  }

  // Обновляем историю в localStorage
  localStorage.setItem('history', JSON.stringify(history));

  // Возвращаем структуру
  return {
      hours: hours,
      stay_out: stay_out,
      sick_leave: sick_leave
  };
}


export default generateRandomStructure
