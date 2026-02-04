// async function checkStatus() {
//         try {
//             // ВАЖНО: добавь путь /api/public/status, если ты его делал на бэкенде
//             const res = await fetch('https://pro-info-api.onrender.com/api/public/status');
//             const data = await res.json();
//             if (data.isMaintenance) {
//                 document.body.innerHTML = `
//                 <header class="header-content">
//     <div class="logo">
//         <a href="index.html">
//             <img src="img/Логотип.png" alt="PRO-info" width="250">
//         </a>
//     </div>

//     <!-- Кнопка бургер (появится на моилах) -->
//     <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню">
//         <span></span>
//     </button>

//     <nav class="dropdown-menu" id="headerNav">
//         <ul>
//             <li><a href="index.html"><img src="/img/images (1)-Photoroom.png" width="21"></a></li>
            
//             <li class="dropdown">
//                 <div class="dropdown-link-wrapper">
//                     <a href="#">Меню</a>
                  
//                 </div>
//                 <ul class="dropdown-content">
//                     <li><a href="two page.html">Погода</a></li>
//                     <li><a href="second.html">Про новый год</a></li>
//                     <!-- <li><a href="school.html">Расписание</a></li> -->
//                     <li><a href="carta.html">Карты</a></li>
//                     <li><a href="news.html">Ошибка</a></li>
//                 </ul>
//             </li>

//             <li><a href="holiday.html">Праздники</a></li>
//             <li><a href="fact.html">Факты</a></li>

//             <li class="dropdown">
//                 <div class="dropdown-link-wrapper">
//                     <a href="#">Разработчик</a>
                    
//                 </div>
//                 <ul class="dropdown-content">
                    
//                     <li><a href="https://github.com/Sozdatel1">Github</a></li>
//                     <li><a href="https://github.com/Sozdatel1/Sozdatel1.github.io">Исходный код</a></li>
//                 </ul>
//             </li>
//             <li><a href="why.html">О сайте</a></li>
//         </ul>
//     </nav>
// </header>
//                 <div style="text-align: center">
//                 <img src="/img/img_stylez/error.png">
//                 <h1 style="text-align: center; 
//                 margin-top: 50px;">🛠 Технические работы</h1>
//                 <h3>Не расстраивайтесь, проблему скоро решат.</h3>
//                 </div>`;
//             }
//         } catch (e) {
//             console.log("Бэкенд еще спит...");
//         }
//     }
//     checkStatus();



    async function checkStatus() {
    const res = await fetch('https://pro-info-api.onrender.com/api/public/status');
    const statuses = await res.json();
    
    const currentPath = window.location.pathname;

    // Если включен общий рубильник ИЛИ выключена текущая страница
    if (statuses.global || statuses[currentPath]) {
        document.body.innerHTML = `
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
                     <li><a href="news.html">Ошибка</a></li>
                 </ul>
             </li>

             <li><a href="holiday.html">Праздники</a></li>
             <li><a href="fact.html">Факты</a></li>

             <li class="dropdown">
                 <div class="dropdown-link-wrapper">                     <a href="#">Разработчик</a>
                    
                 </div>
                 <ul class="dropdown-content">
                    
                     <li><a href="https://github.com/Sozdatel1">Github</a></li>
                     <li><a href="https://github.com/Sozdatel1/Sozdatel1.github.io">Исходный код</a></li>
                 </ul>
             </li>
             <li><a href="why.html">О сайте</a></li>
         </ul>
     </nav>
 </header>
                 <div style="text-align: center">
                 <img src="/img/img_stylez/error.png">
                 <h1 style="text-align: center; 
                 margin-top: 50px;">🛠 Технические работы</h1>
                 <h3>Не расстраивайтесь, проблему скоро решат.</h3>
                 </div>`;
    }
}
checkStatus();
