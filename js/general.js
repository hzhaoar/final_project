window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.innerWidth >= 777) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    } else {
        header.classList.remove('scrolled');
    }
});


