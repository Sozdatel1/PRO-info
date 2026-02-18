async function publishPost() {
    // 1. Собираем данные из ВСЕХ инпутов
    const title = document.getElementById('postTitle').value;
    const text = document.getElementById('postInput').value;
    const image = document.getElementById('postImage').value; // Ссылка на фото

    // Простая проверка перед отправкой
    if (!title || !text) return  Swal.fire({
  icon: "error",
  title: "Ошибка!",
  text: "Заполните все поля!",
  
});

    const response = await fetch('https://pro-info-api.onrender.com/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 2. Отправляем полный объект, который ждет сервер
        body: JSON.stringify({ 
            title: title, 
            text: text, 
            image: image 
        })
    });

    if (response.ok) {
        // alert("Статья успешно опубликована!");
        Swal.fire({
  title: "Опубликовано!",
  text: "Ваша статья появится в ленте через 5 минут",
  icon: "success"
});
        // Очищаем поля
        document.getElementById('postTitle').value = "";
        document.getElementById('postInput').value = "";
        document.getElementById('postImage').value = "";
    } else {
        alert("Ошибка сервера: " + response.status);
    }
}


async function loadPosts() {
    const grid = document.getElementById('dynamic-cards'); // Берем твоюсетку
    if (!grid) return;

    try {
        const response = await fetch(`https://raw.githubusercontent.com/Sozdatel1/PRO-info/main/posts.json?v=${Date.now()}`);
        const posts = await response.json();

        // Очищаем сетку, если хочешь, чтобы статические карточки пропали, 
        // ИЛИ не очищай, если хочешь, чтобы новые посты добавились сверху
        // grid.innerHTML = ''; 

        // Генерируем HTML для новых постов
    const postsHtml = posts.map(post => `
    <a href="article.html?id=${post.id}" style="text-decoration: none; color: inherit;">
        <div class="news-card">
            <div class="card-icon">
            ${post.image ? `<img src="${post.image}" alt="icon" style="margin-bottom: 10px;
     background: #ffe5e000;
     width: 100%;

     border-radius: 5px;
     display: flex;
     text-align: center;
     align-items: center;
     justify-content: center;
     color: #ff5733;

     height: 50%;
     
     object-fit: cover;">` : ''}
            </div>
            <p>
                <strong>${post.title}</strong><br>
                <span style="font-size: 10px; opacity: 0.5;">Читать статью...</span>
            </p>
        </div>
    </a>
`).join('');


        // Вставляем новые посты в начало сетки
        grid.insertAdjacentHTML('afterbegin', postsHtml);
        
    } catch (err) {
        console.error("Ошибка загрузки:", err);
    }
}

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', loadPosts);


async function loadFullArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // Получаем ID из ссылки
    
    const res = await fetch(`https://raw.githubusercontent.com/Sozdatel1/PRO-info/main/posts.json?v=${Date.now()}`);
    const posts = await res.json();
    
    const article = posts.find(p => p.id == id); // Ищем статью по ID
    
    if (article) {
        document.getElementById('artTitle').innerText = article.title;
        // Чтобы абзацы отображались корректно, заменяем переносы строк на <br>
        document.getElementById('artText').innerHTML = article.text.replace(/\n/g, '<br>');
    }
}
loadFullArticle();