window.onscroll = function() {
    const btn = document.getElementById("toTopBtn");
    // Если прокрутили больше 400 пикселей вниз
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 400) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
