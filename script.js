/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeForm');
    const resetButton = document.getElementById('resetButton');
    const startButton = document.getElementById('startButton');

    resetButton.addEventListener('click', () => {
        form.reset();
    });

    startButton.addEventListener('click', () => {
        const inputs = Array.from(form.querySelectorAll('input[type="number"]'));
        let totalTime = 0;

        inputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                totalTime += value;
            }
        });

        if (totalTime > 0) {
            localStorage.setItem('totalTime', totalTime);
            const times = inputs.map(input => input.value);
            localStorage.setItem('times', JSON.stringify(times));
            window.location.href = '/contador/contador.html';
        } else {
            alert('Por favor, insira tempos válidos para iniciar.');
        }
    });
});