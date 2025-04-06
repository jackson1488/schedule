let scheduleData = {};
let currentDay = getCurrentDay();
let currentGroup = "G Группа";

// Получаем текущий день недели
function getCurrentDay() {
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const today = new Date();
  return days[today.getDay()];
}

// Загружаем данные расписания (в реальном проекте это может быть запрос к серверу)
fetch('schedule.json')
  .then(response => response.json())
  .then(data => {
    scheduleData = data;
    updateSchedule();
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));

// Обновляем расписание
function updateSchedule() {
  currentGroup = document.getElementById('group').value;
  const tbody = document.getElementById('schedule-body');
  tbody.innerHTML = ''; // Очищаем таблицу

  const groupSchedule = scheduleData.groups[currentGroup];
  if (!groupSchedule || !groupSchedule[currentDay]) {
    tbody.innerHTML = '<tr><td colspan="4">Нет занятий</td></tr>';
    return;
  }

  const lessons = groupSchedule[currentDay];
  lessons.forEach(lesson => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${lesson.time}</td>
      <td>${lesson.subject}</td>
      <td>${lesson.teacher}</td>
      <td>${lesson.room}</td>
    `;
    tbody.appendChild(row);
  });
}

// Устанавливаем день
function setDay(day) {
  currentDay = day;
  updateSchedule();
}

// Включение уведомлений (заглушка)
function enableNotifications() {
  alert('Уведомления включены! (Это заглушка, нужно добавить реальную логику)');
}