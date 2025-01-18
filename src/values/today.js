let date = new Date();

let today = {
day: date.getDate(),
     month: date.getMonth() + 1,
     year: date.getFullYear()
};

window.today = today;
