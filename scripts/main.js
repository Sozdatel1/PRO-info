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

// const snowContainer = document.getElementById('snow');

// function createSnowflake() {
//   const snowflake = document.createElement('div');
//   snowflake.className = 'snowflake';

//   // Устанавливаем случайный начальный горизонтальный смещающий эффект
//   const size = Math.random() * 4 + 4; // Размер снежинки
//   snowflake.style.width = size + 'px';
//   snowflake.style.height = size + 'px';

//   // Начальная позиция по горизонтали
//   snowflake.style.left = Math.random() * 100 + '%';

//   // Продолжительность падения
//   const duration = Math.random() * 10 + 10; // от 10 до 20 секунд
//   snowflake.style.animationDuration = duration + 's';

//   // Начальная задержка, чтобы снежинки не падали одновременно
//   snowflake.style.animationDelay = Math.random() * 5 + 's';

//   snowContainer.appendChild(snowflake);

//   // Удаляем снежинку после окончания анимации
//   setTimeout(() => {
//     snowflake.remove();
//   }, duration * 1000);
// }

// // Создавать снежинки регулярно
// setInterval(createSnowflake, 30);

window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('cookieAlert').style.display = 'block';
    }, 3000);
});

// Ждем загрузки DOM, чтобы скрипт точно нашел хедер
document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    const header = document.querySelector('.header-content');
    
    // Порог срабатывания (через сколько пикселей скролла прятать хедер)
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        // Текущее расстояние от верха страницы
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Логика направления
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Скролл вниз — добавляем класс скрытия
            header.classList.add('header--hidden');
        } else {
            // Скролл вверх — убираем класс скрытия
            header.classList.remove('header--hidden');
        }

        // Запоминаем позицию для следующего шага
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true }); // passive: true повышает плавность скролла
});
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('menuToggle');
    const menu = document.getElementById('headerNav');
    const body = document.body;

    /**
     * 1. ГЛАВНОЕ МЕНЮ (БУРГЕР)
     * Реализует логику toggleNav: открытие полноэкранного меню
     * и блокировку прокрутки сайта.
     */
    if (burger && menu) {
        burger.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('is-open');
            burger.classList.toggle('is-active');
            
            // Блокировка скролла body (как в оригинальном коде Добродела)
            if (isOpen) {
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
            } else {
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
    }

    /**
     * 2. ПОДМЕНЮ (РАЗДЕЛЫ, РАЗРАБОТЧИК)
     * Открывает вложенные списки при клике на всю область пункта.
     */
    const dropdownWrappers = document.querySelectorAll('.dropdown-link-wrapper');

    dropdownWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            // Предотвращаем переход по ссылке #, чтобы сработало только раскрытие
            e.preventDefault();
            
            const parent = wrapper.closest('.dropdown');
            
            if (parent) {
                // Закрываем другие открытые подменю для экономии места на экране
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('is-expanded');
                    }
                });

                // Переключаем состояние текущего подменю
                parent.classList.toggle('is-expanded');
            }
        });
    });

    /**
     * 3. АВТО-ЗАКРЫТИЕ ПРИ ПЕРЕХОДЕ
     * Если кликнули на конечную ссылку (внутри подменю или обычную),
     * закрываем полноэкранное меню.
     */
    const navLinks = document.querySelectorAll('.dropdown-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Если у ссылки нет подменю (это конечная страница)
            if (!link.closest('.dropdown-link-wrapper')) {
                menu.classList.remove('is-open');
                if (burger) burger.classList.remove('is-active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
    });
});
function updateDaysToVacation() {
    // Укажите дату начала каникул (ГГГГ, ММ (от 0 до 11), ДД)
    // Январь - 0, Февраль - 1 и так далее.
    const vacationDate = new Date(2026, 6, 1); // Пример: 23 марта 2026
    const now = new Date();
    
    // Считаем разницу в миллисекундах
    const diff = vacationDate - now;
    
    const displayElement = document.getElementById('vacation-timer');

    if (diff > 0) {
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        displayElement.innerText = `До летних каникул осталось: ${days} ${getNoun(days, 'день', 'дня', 'дней')}`;
    } else {
        displayElement.innerText = "Ура! Каникулы начались!";
    }
}

// Функция для правильного склонения слова "день"
function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
}

updateDaysToVacation();
