const form = document.querySelector(".guest-form form");
  const lastNameInput = document.getElementById("lastName");
  const firstNameInput = document.getElementById("firstName");
  const drinkSelect = document.getElementById("drink");
  const selfDrinkInput = document.getElementById("selfDrinkOption");
  const formError = document.getElementById("formError");

  form.addEventListener("submit", function(e) {
    const lastName = lastNameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const drinkValue = drinkSelect.value;
    const selfDrink = selfDrinkInput.value.trim();

    formError.style.display = "none";
    formError.textContent = "";

    if (!lastName || !firstName) {
      e.preventDefault();
      formError.textContent = "Введите Фамилию и Имя";
      formError.style.display = "block";
      return;
    }

    if (drinkValue === "selfoption" && !selfDrink) {
      e.preventDefault();
      formError.textContent = "Введите свой вариант или выберите из списка";
      formError.style.display = "block";
      return;
    }
  });