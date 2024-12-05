const images = [
    { src: './assets/images/anon_profile01.jpg', answer: { x: 0.12, y: 0.12 } },
    { src: './assets/images/anon_profile02.jpg', answer: { x: 0.7, y: 0.2 } },
    { src: './assets/images/anon_profile03.jpg', answer: { x: 0.9, y: 0.5 } },
    { src: './assets/images/anon_profile04.jpg', answer: { x: 0.5, y: 0.5 } }
];

let currentLevel = 0;
let health = 100;
const maxError = 0.05;

const gameImage = document.getElementById('game-image');
const healthDisplay = document.getElementById('health');
const gameInfo = document.getElementById('game-info');
const nextLevelButton = document.getElementById('next-level');
const restartGameButton = document.getElementById('restart-game');
const answerIndicator = document.getElementById('answer-indicator');

function updateAnswerIndicator() {
    const answer = images[currentLevel].answer;
    const rect = gameImage.getBoundingClientRect();
    const radius = maxError * rect.width; // Calculate radius based on maxError
    answerIndicator.style.width = `${radius * 2}px`;
    answerIndicator.style.height = `${radius * 2}px`;
    answerIndicator.style.left = `${rect.left + answer.x * rect.width - radius}px`;
    answerIndicator.style.top = `${rect.top - answer.y * rect.height - radius}px`;
    answerIndicator.style.display = 'block';
}

gameImage.addEventListener('click', (event) => {
    const rect = gameImage.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / rect.width;
    console.log(clickX)
    const clickY = (event.clientY - rect.top) / rect.height;
    console.log(clickY)
    const answer = images[currentLevel].answer;

    if (Math.abs(clickX - answer.x) <= maxError && Math.abs(clickY - answer.y) <= maxError) {
        gameInfo.textContent = 'Correct! Click "Next Level" to proceed.';
        nextLevelButton.style.display = 'block';
        updateAnswerIndicator();

    } else {
        health -= 5;
        healthDisplay.textContent = `Health: ${health}`;
        gameInfo.textContent = 'Incorrect! Try again.';
        if (health <= 0) {
            gameInfo.textContent = 'Game Over!';
            restartGameButton.style.display = 'block';
        }
    }
});

nextLevelButton.addEventListener('click', nextLevel);

restartGameButton.addEventListener('click', resetGame);

function nextLevel() {
    currentLevel++;
    if (currentLevel < images.length) {
        gameImage.src = images[currentLevel].src;
        gameInfo.textContent = '';
        nextLevelButton.style.display = 'none';
        answerIndicator.style.display = 'none';
    } else {
        gameInfo.textContent = 'Congratulations! You completed all levels.';
        restartGameButton.style.display = 'block';
    }
}

function resetGame() {
    currentLevel = 0;
    health = 100;
    healthDisplay.textContent = `Health: ${health}`;
    gameImage.src = images[currentLevel].src;
    gameInfo.textContent = '';
    nextLevelButton.style.display = 'none';
    restartGameButton.style.display = 'none';
    answerIndicator.style.display = 'none';
}
