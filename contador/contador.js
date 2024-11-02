document.addEventListener("DOMContentLoaded", () => {
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");
    const activityTime = document.getElementById("activityTime");
    const activityName = document.getElementById("activityName");
    const totalCountdown = document.getElementById("totalCountdown");
    const backButton = document.getElementById("backButton");

    const activities = [
        "Preparação",
        "Abertura",
        "Louvor",
        "Boas Vindas",
        "Ações de Graças",
        "Ofertório",
        "Ministração",
        "Avisos Finais",
    ];
    const times = JSON.parse(localStorage.getItem("times")) || [];
    let currentActivityIndex = 0;

    let totalDuration = times.reduce((acc, time) => acc + parseInt(time, 10) * 60, 0);

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        date.textContent = `Data: ${day}/${month}/${year}`;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startCountdown(duration, displayElement, totalInterval) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            displayElement.textContent = `${minutes}:${seconds}`;

            if (--timer < 0) {
                clearInterval(interval);
                currentActivityIndex++;
                if (currentActivityIndex < times.length) {
                    loadNextActivity();
                } else {
                    clearInterval(totalInterval);
                    alert("Atividades concluídas!");
                    window.history.back();
                }
            }
        }, 1000);
    }

    function startTotalCountdown() {
        const totalInterval = setInterval(() => {
            totalCountdown.textContent = `Tempo Total: ${formatTime(totalDuration)}`;
            if (--totalDuration < 0) {
                clearInterval(totalInterval);
                totalCountdown.textContent = "Tempo Total: 00:00";
            }
        }, 1000);
        return totalInterval;
    }

    function loadNextActivity() {
        if (currentActivityIndex < times.length) {
            const duration = parseInt(times[currentActivityIndex], 10) * 60;
            activityName.textContent = activities[currentActivityIndex];
            const totalInterval = startTotalCountdown();
            startCountdown(duration, activityTime, totalInterval);
        }
    }

    backButton.addEventListener('click',backPage)
    function backPage(){
        window.history.back();

    }
    setInterval(updateTime, 1000);
    updateTime();
    if (times.length > 0) loadNextActivity();
});