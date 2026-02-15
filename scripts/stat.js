 // ДАННЫЕ ПРОЕКТА
        const S_URL = 'https://nwopcdkydnuudovkgvxs.supabase.co';
        const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53b3BjZGt5ZG51dWRvdmtndnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMjQ2MTEsImV4cCI6MjA4NjcwMDYxMX0.GE0Ndd_O2lqEo3kOph5epUHZHO0jXBaCv8CBYGzBAAU';
        
        const db = supabase.createClient(S_URL, S_KEY);

        // 1. АВТО-УЗНАВАНИЕ (Вместо кук)
        async function checkUser() {
            const { data: { user } } = await db.auth.getUser();
            const status = document.getElementById('user-status');
            
            if (user) {
                document.getElementById('auth-ui').classList.add('hidden');
                document.getElementById('post-ui').classList.remove('hidden');
                status.innerHTML = `Вы вошли как: <b>${user.email}</b><br><small>ID: ${user.id}</small>`;
                return user;
            } else {
                document.getElementById('auth-ui').classList.remove('hidden');
                document.getElementById('post-ui').classList.add('hidden');
                status.innerText = "Вы не авторизованы. Войдите, чтобы писать статьи.";
                return null;
            }
        }

        // 2. ВХОД И МОМЕНТАЛЬНАЯ РЕГИСТРАЦИЯ
        async function handleLogin() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Пробуем войти
            let { data, error } = await db.auth.signInWithPassword({ email, password });

            // Если юзера нет — регистрируем (без почты, если нажал Save в настройках)
            if (error && error.message.includes("Invalid login credentials")) {
                const signup = await db.auth.signUp({ email, password });
                if (signup.error) return alert("Ошибка: " + signup.error.message);
                alert("Аккаунт создан! Добро пожаловать.");
                location.reload();
            } else if (error) {
                alert("Ошибка: " + error.message);
            } else {
                location.reload();
            }
        }

        // 3. ПУБЛИКАЦИЯ (Привязка к User ID из таблицы Users)
        async function handlePublish() {
            const user = await checkUser();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            if (!title || !content) return alert("Заполните все поля!");

            const { error } = await db.from('articles').insert([{ 
                title, content, author_id: user.id, author_name: user.email 
            }]);

            if (error) alert(error.message);
            else {
                alert("Статья добавлена!");
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                loadArticles(); // Обновляем ленту
            }
        }

        // 4. ВЫВОД ВСЕХ СТАТЕЙ
        async function loadArticles() {
            const { data, error } = await db.from('articles').select('*').order('created_at', { ascending: false });
            const list = document.getElementById('articles-list');
            
            if (error) return list.innerText = "Ошибка загрузки данных.";

            list.innerHTML = data.map(a => `
                <div class="article">
                    <h4 style="margin:0">${a.title}</h4>
                    <p>${a.content}</p>
                    <div class="meta">Автор: ${a.author_name} | ID: ${a.author_id.substring(0,8)}...</div>
                </div>
            `).join('') || "Статей пока нет. Будьте первым!";
        }

        async function handleLogout() {
            await db.auth.signOut();
            location.reload();
        }

        // Запуск системы
        checkUser();
        loadArticles();