// Calcular o primeiro dia da semana do ano

function getDays(year) {
	year = year - 1;

	function julianDays(year) {
		let bissexto = (year - year % 4) / 4;
		let days = (year - bissexto) * 365 + bissexto * 366;
		return days;
	}

	function gregorianDays(year) {
		let bissexto = ((year - year % 4) / 4 - 395) -
			((year - year % 100) / 100 - 15) +
			((year - year % 400) / 400 - 3);
		let gregorianYear = year - 1581;
		let days = ((gregorianYear - bissexto) * 365 + bissexto * 366) - 10
		return days;
	}

	if (year >= 1582) {
		let gregorianYear = year - 1581;
		let julianYear = year - gregorianYear;
		return julianDays(julianYear) + gregorianDays(year);
	} else {
		return julianDays(year);
	}
}

function calculateWeekDay(year) {
	let days = getDays(year);
	let weekDay = 6;
    let result = (days + weekDay) % 7; 

	return result;
}

window.calculateWeekDay = calculateWeekDay;
