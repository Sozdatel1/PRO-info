const header = document.getElementById('header')
if (header) {
header.innerHTML = `

<header class="header-content">
    <div class="logo">
        <a href="index.html">
            <img src="img/Логотип.png" alt="PRO-info" width="250">
        </a>
    </div>

    <!-- Кнопка бургер (появится на моилах) -->
    <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню">
        <span></span>
    </button>

    <nav class="dropdown-menu" id="headerNav">
        <ul>
            <li><a href="index.html"><img src="/img/images (1)-Photoroom.png" width="21"></a></li>
            
            <li class="dropdown">
                <div class="dropdown-link-wrapper">
                    <a href="#">Меню</a>
                  
                </div>
                <ul class="dropdown-content">
                    <li><a href="two page.html">Погода</a></li>
                    <li><a href="second.html">Про новый год</a></li>
                    <!-- <li><a href="school.html">Расписание</a></li> -->
                    <li><a href="carta.html">Карты</a></li>
                    
                </ul>
            </li>

            <li><a href="holiday.html">Праздники</a></li>
            <li><a href="fact.html">Факты</a></li>

            <li class="dropdown">
                <div class="dropdown-link-wrapper">
                    <a href="#">Разработчик</a>
                    
                </div>
                <ul class="dropdown-content">
                    
                    <li><a href="https://github.com/Sozdatel1">Github</a></li>
                    <li><a href="https://github.com/Sozdatel1/Sozdatel1.github.io">Исходный код</a></li>
                </ul>
            </li>
            <li><a href="why.html">О сайте</a></li>
        </ul>
       

    </nav>




<div class="tema">
<p>Тёмная тема</p>
<label class="switch">
<input type="checkbox" class="theme-checkbox">
<span class="slider"></span>
</label>
</div>
</header>
`
}
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

// СЧЁТЧИК ОНЛАЙНА
const RENDER_URL = 'https://pro-info-api.onrender.com';

// Подключаемся с настройками, чтобы быстрее работало через прокси
const socket = io(RENDER_URL, {
    transports: ['websocket', 'polling']
});

const counterElement = document.getElementById('online-counter');

if (counterElement) {
socket.on('updateCount', (count) => {
    counterElement.innerText = count;
    console.log('Текущий онлайн:', count);
});
}

socket.on('connect_error', (error) => {
    console.log('Ошибка подключения:', error);
    // counterElement.innerText = 'пробуждаю сервер...';
    counterElement.innerHTML = '<span class="spinner"></span>';
});

socket.on('connect', () => {
    console.log('Успешно подключено к серверу!');
});


