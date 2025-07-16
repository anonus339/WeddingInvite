document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-09-07T12:00:00");

  function declension(n, [one, two, five]) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return five;
    if (n1 > 1 && n1 < 5)      return two;
    if (n1 === 1)              return one;
    return five;
  }

  function updateTimer() {
    const now  = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById("timerDays").textContent    = "0";
      document.getElementById("timerHours").textContent   = "0";
      document.getElementById("timerMinutes").textContent = "0";
      document.querySelector(".timer-block:nth-child(1) .hint").textContent = "дней";
      document.querySelector(".timer-block:nth-child(3) .hint").textContent = "часов";
      document.querySelector(".timer-block:nth-child(5) .hint").textContent = "минут";
      return;
    }

    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours   = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("timerDays").textContent    = days;
    document.getElementById("timerHours").textContent   = hours;
    document.getElementById("timerMinutes").textContent = minutes;

    document.querySelector(".timer-block:nth-child(1) .hint").textContent = declension(days,    ["день",  "дня",   "дней"]);
    document.querySelector(".timer-block:nth-child(3) .hint").textContent = declension(hours,   ["час",   "часа",  "часов"]);
    document.querySelector(".timer-block:nth-child(5) .hint").textContent = declension(minutes, ["минута","минуты","минут"]);
  }

  updateTimer();
  setInterval(updateTimer, 100);
});