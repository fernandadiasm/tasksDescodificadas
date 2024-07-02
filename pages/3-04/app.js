document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const cardName = document.querySelector("#card__name");
  const cardNumber = document.querySelector("#card__number");
  const cardCvc = document.querySelector("#card__cvc");
  const expiryMonth = document.querySelector("#card__exp");
  const expiryYear = document.querySelector("#card__year");
  const completedState = document.querySelector(".completed__state");
  const continueBtn = document.querySelector("#continue");

  // Card Text
  const cardNumberText = document.querySelector(".card__number");
  const cardNameText = document.querySelector(".card__name");
  const cardExpiryMonthText = document.querySelector(".card__month");
  const cardExpiryYearText = document.querySelector(".card__year");
  const cardCvcText = document.querySelector(".cvc__number");

  const nameError = document.querySelector(".name__error");
  const numberError = document.querySelector(".num__error");
  const cvcError = document.querySelector(".cvc__error");
  const expiryError = document.querySelector(".exp__error");

  // Update card details on the dummy card
  function updateCardDetails(inputElement, textElement, defaultText) {
    inputElement.addEventListener("input", () => {
      let value = inputElement.value;
      textElement.textContent = value || defaultText;

      if (inputElement === cardNumber) {
        textElement.textContent = formatCardNumber(value);
      }

      if (inputElement.value.length > inputElement.maxLength) {
        inputElement.value = inputElement.value.slice(0, inputElement.maxLength);
      }
    });
  }

  // Format card number
  function formatCardNumber(number) {
    return number.replace(/(.{4})/g, "$1 ").trim();
  }

  updateCardDetails(cardName, cardNameText, "Jane Appleseed");
  updateCardDetails(cardNumber, cardNumberText, "0000 0000 0000 0000");
  updateCardDetails(cardCvc, cardCvcText, "000");
  updateCardDetails(expiryMonth, cardExpiryMonthText, "00");
  updateCardDetails(expiryYear, cardExpiryYearText, "00");

  // Add real-time validation for expiry date
  expiryMonth.addEventListener("input", () => {
    validateExpiryDate(expiryMonth.value, expiryYear.value);
  });

  expiryYear.addEventListener("input", () => {
    validateExpiryDate(expiryMonth.value, expiryYear.value);
  });

  // Validate form fields
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const card = {
      name: cardName.value.trim(),
      number: cardNumber.value.trim(),
      cvc: cardCvc.value.trim(),
      expiryMonth: expiryMonth.value.trim(),
      expiryYear: expiryYear.value.trim(),
    };

    if (validateForm(card)) {
      form.style.display = "none";
      completedState.style.display = "block";
    }
  });

  function validateForm(card) {
    const currentYear = new Date().getFullYear().toString().slice(2, 4);
    const currentMonth = new Date().getMonth() + 1;
    let isValid = true;

    if (!validateName(card.name)) {
      isValid = false;
    }

    if (!validateCardNumber(card.number)) {
      isValid = false;
    }

    if (!validateNotEmpty(card.cvc, cvcError, cardCvc, "CVC can't be blank") || !validateCVC(card.cvc)) {
      isValid = false;
    }

    if (!validateExpiryDate(card.expiryMonth, card.expiryYear, currentMonth, currentYear)) {
      isValid = false;
    }

    return isValid;
  }

  function validateNotEmpty(value, errorElement, inputElement, errorMessage) {
    if (value === "") {
      errorElement.textContent = errorMessage;
      inputElement.style.borderColor = "var(--primary-red)";
      return false;
    } else {
      errorElement.textContent = "";
      inputElement.style.borderColor = "var(--light-grayish-violet)";
      return true;
    }
  }

  function validateCardNumber(number) {
    const numberRegex = /^\d{16}$/;
    if (!numberRegex.test(number)) {
      numberError.textContent = "Invalid card number";
      cardNumber.style.borderColor = "var(--primary-red)";
      return false;
    } else {
      numberError.textContent = "";
      cardNumber.style.borderColor = "var(--light-grayish-violet)";
      return true;
    }
  }

  function validateCVC(cvc) {
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(cvc)) {
      cvcError.textContent = "Invalid CVC";
      cardCvc.style.borderColor = "var(--primary-red)";
      return false;
    } else {
      cvcError.textContent = "";
      cardCvc.style.borderColor = "var(--light-grayish-violet)";
      return true;
    }
  }

  function validateExpiryDate(month, year) {
    const currentYear = new Date().getFullYear().toString().slice(2, 4);
    const currentMonth = new Date().getMonth() + 1;

    if (!validateNotEmpty(month, expiryError, expiryMonth, "Expiry month can't be blank") || 
        !validateNotEmpty(year, expiryError, expiryYear, "Expiry year can't be blank")) {
      return false;
    }

    if (isNaN(month) || month < 1 || month > 12 || isNaN(year)) {
      expiryError.textContent = "Invalid expiration date";
      expiryMonth.style.borderColor = "var(--primary-red)";
      expiryYear.style.borderColor = "var(--primary-red)";
      return false;
    } 

    // Check if the expiration date is in the past
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
      expiryError.textContent = "Expiration date cannot be in the past";
      expiryMonth.style.borderColor = "var(--primary-red)";
      expiryYear.style.borderColor = "var(--primary-red)";
      return false;
    } else {
      expiryError.textContent = "";
      expiryMonth.style.borderColor = "var(--light-grayish-violet)";
      expiryYear.style.borderColor = "var(--light-grayish-violet)";
      return true;
    }
  }

  function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (name === "") {
      nameError.textContent = "Cardholder name can't be blank";
      cardName.style.borderColor = "var(--primary-red)";
      return false;
    } else if (!nameRegex.test(name)) {
      nameError.textContent = "Cardholder name can't contain numbers";
      cardName.style.borderColor = "var(--primary-red)";
      return false;
    } else {
      nameError.textContent = "";
      cardName.style.borderColor = "var(--light-grayish-violet)";
      return true;
    }
  }

  // Real-time validation for cardholder name
  cardName.addEventListener("input", () => {
    // Remove any numbers from the input value
    cardName.value = cardName.value.replace(/\d/g, "");
    validateName(cardName.value);
  });

  // Continue Button
  continueBtn.addEventListener("click", () => {
    completedState.style.display = "none";
    form.style.display = "block";
    window.location.reload();
  });
});
