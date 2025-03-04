function generateRandomStructure() {
    // Получаем данные из localStorage или инициализируем их, если они отсутствуют
    let history = JSON.parse(localStorage.getItem('history')) || { stay_out_count: 0, sick_leave_count: 0, last_stay_out: false, last_sick_leave: false };

    // Генерация случайных значений
    let hours = Math.floor(Math.random() * 12) + 1;
    let stay_out = false;
    let sick_leave = false;

    // Определяем, будет ли stay_out или sick_leave true
    if (history.stay_out_count === 0 && history.sick_leave_count === 0) {
        // Если оба счетчика равны нулю, выбираем случайно
        if (Math.random() < 0.5) {
            stay_out = true;
            history.stay_out_count = Math.floor(Math.random() * 4) + 2; // От 2 до 5 раз
        } else {
            sick_leave = true;
            history.sick_leave_count = Math.floor(Math.random() * 4) + 2; // От 2 до 5 раз
        }
    } else if (history.stay_out_count > 0) {
        stay_out = true;
        history.stay_out_count--;
    } else if (history.sick_leave_count > 0) {
        sick_leave = true;
        history.sick_leave_count--;
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

console.log(generateRandomStructure());