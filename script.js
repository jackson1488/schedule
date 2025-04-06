let scheduleData = {};
let currentDay = getCurrentDay();
let currentGroup = "201-ТМ";

function getCurrentDay() {
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const today = new Date();
  return days[today.getDay()];
}

fetch('schedule.json')
  .then(response => response.json())
  .then(data => {
    scheduleData = data;
    updateSchedule();
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));

function updateSchedule() {
  currentGroup = document.getElementById('group').value;
  const tbody = document.getElementById('schedule-body');
  tbody.innerHTML = '';

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

function setDay(day) {
  currentDay = day;
  updateSchedule();
}

function enableNotifications() {
  alert('Уведомления включены! (Это заглушка)');
}