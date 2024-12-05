document.getElementById('toggleSpoilers').addEventListener('click', function () {
    const descriptions = document.querySelectorAll('.episode-description p');
    const button = this;
    descriptions.forEach(description => {
        description.classList.toggle('hidden');
    });
    button.textContent = button.textContent === 'Show Spoilers' ? 'Hide Spoilers' : 'Show Spoilers';
});