const CONFIG = {
    TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN, 
    REPO: 'Sozdatel1/PRO-info',
    PATH: 'posts.json'
};

// 1. ФУНКЦИЯ ПУБЛИКАЦИИ
async function publishPost() {
    const text = document.getElementById('postInput').value;
    const btn = document.getElementById('sendBtn');
    const status = document.getElementById('status');

    if(!text) return;
    btn.disabled = true;
    status.innerText = "ШИФРОВАНИЕ И ОТПРАВКА...";

    try {
        // Получаем текущий файл и его SHA
        const res = await fetch(`https://api.github.com/repos/${CONFIG.REPO}/contents/${CONFIG.PATH}`, {
            headers: { 'Authorization': `token ${CONFIG.TOKEN}` }
        });
        const file = await res.json();
        
        // Декодируем старые посты
        let posts = JSON.parse(atob(file.content));
        
        // Добавляем новый пост
        posts.unshift({ id: Date.now(), text: text, date: new Date().toLocaleString() });

        // Отправляем обратно на GitHub
        const update = await fetch(`https://api.github.com/repos/${CONFIG.REPO}/contents/${CONFIG.PATH}`, {
            method: 'PUT',
            headers: { 'Authorization': `token ${CONFIG.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "New post: " + text.substring(0, 10) + "...",
                content: btoa(unescape(encodeURIComponent(JSON.stringify(posts, null, 2)))),
                sha: file.sha
            })
        });

        if (update.ok) {
            status.innerText = "УСПЕХ. VERCEL ДЕПЛОИТ...";
            document.getElementById('postInput').value = "";
            setTimeout(loadFeed, 2000); // Обновляем ленту
        }
    } catch (e) {
        status.innerText = "ОШИБКА ДОСТУПА";
    } finally {
        btn.disabled = false;
    }
}

// 2. ФУНКЦИЯ ЗАГРУЗКИ ЛЕНТЫ
async function loadFeed() {
    try {
        const url = `https://raw.githubusercontent.com/${CONFIG.REPO}/main/${CONFIG.PATH}?t=${Date.now()}`;
        const res = await fetch(url);
        const posts = await res.json();
        
        document.getElementById('feed').innerHTML = posts.map(p => `
            <div style="border-left: 1px solid #333; padding-left: 20px; margin-bottom: 10px;">
                <div style="font-size: 9px; opacity: 0.3;">${p.date}</div>
                <div style="font-size: 14px; margin-top: 5px; line-height: 1.6;">${p.text}</div>
            </div>
        `).join('');
    } catch (e) { console.log("Лента пуста"); }
}

window.onload = loadFeed;
