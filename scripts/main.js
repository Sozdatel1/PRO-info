const holidays = {

  
  "01-01": "Новый год",
  "01-07": "Православное Рождество",
  "02-01": "Лунный Новый год", // дата меняется
  "02-14": "День святого Валентина",
  "02-23": "День защитника Отечества", /* Россия */
  "03-08": "Международный женский день",
  "03-21": "Международный день лесов",
  "03-22": "Всемирный день воды",
  "03-24": "Всемирный день борьбы с туберкулёзом",
  "04-01": "День смеха",
  "04-07": "Всемирный день здоровья",
  "04-22": "День Земли",
  "04-23": "Всемирный день книжных магазинов",
  "04-22": "Пасха",
  "05-01": "Праздник труда",
  "05-03": "День свободы прессы",
  "05-09": "День Победы",
  "05-15": "Международный день семьи",
  "06-01": "День защиты детей",
  "06-05": "Международный день охраны окружающей среды",
  "06-12": "День России",
  "07-01": "День Канады",
  "07-11": "Международный день народонаселения",
  "07-18": "Международный день ЮНЕСКО",
  "08-12": "Международный день молодежи",
  "09-01": "День знаний",
  "09-21": "Международный день мира",
  "10-01": "День пожилых людей",
  "10-04": "День учителя",
  "10-10": "Всемирный день психического здоровья",
  "10-16": "Международный день окружающей среды",
  "11-01": "День всеобщего тестирования ",
  "11-20": "Международный день действий за отказ от смертной казни",
  "12-10": "Международный день прав человека",
  "12-12": "День Конституции России",
  "06-21": "Летнее солнцестояние"

  
};

function checkHoliday() {
  const today = new Date();
  const month = today.getMonth() + 1; // Месяцы с 1
  const day = today.getDate();

  const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const holidayName = holidays[dateKey];
  const displayDiv = document.getElementById('holiday');

  if (displayDiv) {
    if (holidayName) {
      displayDiv.innerHTML = `<h2>Сегодня отмечают праздник : ${holidayName}</h2>`;
    } else {
      displayDiv.innerHTML = `<h2>Сегодня обычный день.</h2>`;
    }
  }
}

// Запускаем при загрузке страницы
window.onload = checkHoliday;

// const facts = {

// "01-12": "Осьминоги имеют три сердца!",
// "01-13": "Осьминоги имеют три сердца!",
// "01-14": "Осьминоги имеют три сердца!",
// "01-15": "Осьминоги имеют три сердца!",
// "01-16": "Осьминоги имеют три сердца!",
// "01-17": "Осьминоги имеют три сердца!",
// "01-18": "Осьминоги имеют три сердца!",
// "01-19": "Осьминоги имеют три сердца!",
// "01-20": "",
// // "01-21":
// // "01-22":
// // "01-23":
// // "01-24":
// // "01-25":
// // "01-26":
// // "01-27":
// // "01-28":
// // "01-29":
// // "01-30":
// // "01-31":
// // "02-01":
// // "02-02":
// // "02-03":
// // "02-04":
// // "02-05":
// // "02-06":
// // "02-07":
// // "02-08":
// // "02-09":
// // "02-10":
// // "02-11":
// // "02-12":
// };

// function checkFact() {
//   const today = new Date();
//   const month = today.getMonth() + 1; // Месяцы с 1
//   const day = today.getDate();

//   const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//   const factsName = facts[dateKey];
//   const displayDiv = document.getElementById('fact');

//   if (displayDiv) {
//     if (factsName) {
//       displayDiv.innerHTML = `<h2>Факт недели: ${factsName}</h2>`;
//     } else {
//       displayDiv.innerHTML = `<h2>На сегодня факта нет</h2>`;
//     }
//   }
// }

// // Запускаем при загрузке страницы
// window.onload = checkFact;
// const snowContainer = document.getElementById('snow');

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';

  // Устанавливаем случайный начальный горизонтальный смещающий эффект
  const size = Math.random() * 4 + 4; // Размер снежинки
  snowflake.style.width = size + 'px';
  snowflake.style.height = size + 'px';

  // Начальная позиция по горизонтали
  snowflake.style.left = Math.random() * 100 + '%';

  // Продолжительность падения
  const duration = Math.random() * 10 + 10; // от 10 до 20 секунд
  snowflake.style.animationDuration = duration + 's';

  // Начальная задержка, чтобы снежинки не падали одновременно
  snowflake.style.animationDelay = Math.random() * 5 + 's';

  snowContainer.appendChild(snowflake);

  // Удаляем снежинку после окончания анимации
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// Создавать снежинки регулярно
setInterval(createSnowflake, 30);

window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('cookieAlert').style.display = 'block';
    }, 3000);
});
