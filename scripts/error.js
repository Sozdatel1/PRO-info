async function checkStatus() {
        try {
            // ВАЖНО: добавь путь /api/public/status, если ты его делал на бэкенде
            const res = await fetch('https://pro-info-api.onrender.com/api/public/status');
            const data = await res.json();
            if (data.isMaintenance) {
                document.body.innerHTML = `<div style="text-align: center">
                <img src="/img/img_stylez/error.png">
                <h1 style="text-align: center; 
                  margin-top: 50px;">🛠 Технические работы</h1>
                  <h3>Не расстраивайтесь, проблему скоро решат.</h3>
                </div>`;
            }
        } catch (e) {
            console.log("Бэкенд еще спит...");
        }
    }
    checkStatus();
