document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".date > h1");
  const text = h1.textContent.trim();
  h1.textContent = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = "translateY(-30px) rotate(-10deg)";
    span.style.animation = `revealLetter 0.5s ease-out forwards`;
    span.style.animationDelay = `${i * 0.1}s`;
    h1.append(span);
  });
});
