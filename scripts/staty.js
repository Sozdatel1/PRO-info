async function publishPost() {
    const text = document.getElementById('postInput').value;
    
    // Твой новый секретный шлюз на Render
    const response = await fetch('https://pro-info-api.onrender.com/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });

    if (response.ok) alert("Опубликовано через сервер!");
}
