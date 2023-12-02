const dobDay = document.querySelector(".answer__days");
const dobMonth = document.querySelector(".answer__months");
const dobYear = document.querySelector(".answer__years");

const submitBtn = document.querySelector(".submitButton");

const now = new Date();
let nowDay = now.getDate();
let nowMonth = now.getMonth();
let nowYear = now.getFullYear();

let day = 0;
let month = 0;
let year = 0;

const AssignData = () => {
	const bDay = document.querySelector("#birthDay");
	const bMonth = document.querySelector("#birthMonth");
	const bYear = document.querySelector("#birthYear");
	let arrayDays = [];

	if (bYear.value % 4 == 0) {
		arrayDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	} else {
		arrayDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
	checkForm([bDay, bMonth, bYear], arrayDays);
};

const checkForm = (arrayDate, arrayDays) => {
	let errors = 0;
	arrayDate.forEach((el) => {
		if (el.value == 0) {
			let msg = "This field is required";
			showError(el, msg);
			errors++;
		} else {
			clearError(el);
		}
	});
	if (arrayDate[0].value < 0 || arrayDate[0].value > 31) {
		showError(arrayDate[0], "Must be a valid day");
		errors++;
	} else if (arrayDate[1].value > 0 && arrayDate[1].value < 13) {
		if (arrayDate[0].value > arrayDays[arrayDate[1].value - 1]) {
			showError(arrayDate[0], "Must be a valid day");
			errors++;
		}
	}
	if (arrayDate[1].value < 0 || arrayDate[1].value > 12) {
		showError(arrayDate[1], "Must be a valid month");
		errors++;
	}
	if (arrayDate[2].value > 2023) {
		showError(arrayDate[2], "Must be a valid year");
		errors++;
	}
	if (errors === 0) {
		ageCalculator(arrayDate[0].value, arrayDate[1].value, arrayDate[2].value, arrayDays);
	}
};

const showError = (input, msg) => {
	input.nextElementSibling.textContent = msg;
	input.nextElementSibling.classList.add("text-error-show");
	input.previousElementSibling.classList.add("birth__title--error");
	input.classList.add("birth__input--error");
};

const clearError = (input) => {
	input.nextElementSibling.classList.remove("text-error-show");
	input.previousElementSibling.classList.remove("birth__title--error");
	input.classList.remove("birth__input--error");
};

const ageCalculator = (bDay, bMonth, bYear, arrayDays) => {
	if (nowDay < bDay) {
		day = nowDay + arrayDays[parseInt(bMonth) - 1] - bDay;

		if (nowMonth < bMonth) {
			month = nowMonth + 12 - bMonth;
			year = nowYear - 1 - bYear;
		} else {
			month = nowMonth - bMonth;
			year = nowYear - bYear;
		}
	} else {
		day = nowDay - bDay;
		month = nowMonth - bMonth + 1;
		year = nowYear - bYear;
	}

	dobDay.textContent = day;
	dobMonth.textContent = month;
	dobYear.textContent = year;
};

submitBtn.addEventListener("click", () => {
	AssignData();
});
