const DAY_INPUT = document.getElementById("day");
const MONTH_INPUT = document.getElementById("month");
const YEAR_INPUT = document.getElementById("year");
const DAY_RESULT = document.getElementById("day-result");
const MONTH_RESULT = document.getElementById("month-result");
const YEAR_RESULT = document.getElementById("year-result");
const OUTPUT_ERRORS = document.querySelectorAll(".input-error");
const FORM = document.getElementById("form");

function ageInMilliseconds(year, month, day) {
  const date = new Date(year, month, day);
  const now = new Date();
  const age = now - date;
  return age;
}

function calcYearsMonthsDays(age) {
  const millisecondsInYear = 31557600000;
  const millisecondsInMonth = 2629800000;
  const millisecondsInDay = 86400000;
  const years = Math.floor(age / millisecondsInYear);
  const months = Math.floor((age % millisecondsInYear) / millisecondsInMonth);
  const days = Math.floor(
    ((age % millisecondsInYear) % millisecondsInMonth) / millisecondsInDay
  );
  return { years, months, days };
}

function handleSubmit(event) {
  event.preventDefault();

  const day = DAY_INPUT.value;
  const month = MONTH_INPUT.value;
  const year = YEAR_INPUT.value;

  const age = ageInMilliseconds(year, month - 1, day);
  const result = calcYearsMonthsDays(age);

  DAY_RESULT.innerHTML = result.days;
  MONTH_RESULT.innerHTML = result.months;
  YEAR_RESULT.innerHTML = result.years;
}

FORM.addEventListener("submit", handleSubmit);

function inputErrors(value, name, min, max) {
  if (value === "") return `${name} is required`;
  if (min && Number(value) < min) return `${name} must be greater than ${min}`;
  if (max && Number(value) > max) return `${name} must be less than ${max}`;
}

function handleError(event, outputElement) {
  const { name, value, min, max } = event.target;
  const error = inputErrors(value, name, min, max);
  if (error) {
    outputElement.innerText = error;
    event.target.classList.add("error");
  } else {
    outputElement.innerText = "";
    event.target.classList.remove("error");
  }
}

DAY_INPUT.addEventListener("blur", (e) => handleError(e, OUTPUT_ERRORS[0]));
MONTH_INPUT.addEventListener("blur", (e) => handleError(e, OUTPUT_ERRORS[1]));
YEAR_INPUT.addEventListener("blur", (e) => handleError(e, OUTPUT_ERRORS[2]));