document.addEventListener("DOMContentLoaded", () => {

    const picker = document.getElementById("yearPicker");
    const year = document.getElementById("year");
    const year_opt0 = document.getElementById("year-option0")
    const year_opt1 = document.getElementById("year-option1")
    const year_opt2 = document.getElementById("year-option2")
    const year_opt3 = document.getElementById("year-option3")
    const year_opt4 = document.getElementById("year-option4")

    const currentYear = new Date().getFullYear();
    let activeYear = currentYear;
    const years = Array.from({length: 201}, (_, i) => (currentYear - 100) + i);

    let yearScrollCount = 0;
    const scrollThreshold = 5;

    year_opt0.innerHTML = activeYear - 2;
    year_opt1.innerHTML = activeYear - 1;
    year_opt2.innerHTML = activeYear;
    year_opt3.innerHTML = activeYear + 1;
    year_opt4.innerHTML = activeYear + 2;

    year.addEventListener("wheel", (e) => {
        e.preventDefault();
        yearScrollCount++;

        if (yearScrollCount >= scrollThreshold) {
            if (e.deltaY > 0) {
                activeYear++;
            } else if (e.deltaY < 0) {
                activeYear--;
            }

            activeYear = Math.max(currentYear - 100, Math.min(currentYear + 100, activeYear));

            year_opt0.innerHTML = (activeYear - 2 >= currentYear - 100) ? activeYear - 2 : " ";
            year_opt1.innerHTML = (activeYear - 1 >= currentYear - 100) ? activeYear - 1 : " ";
            year_opt2.innerHTML = activeYear;
            year_opt3.innerHTML = (activeYear + 1 <= currentYear + 100) ? activeYear + 1 : " ";
            year_opt4.innerHTML = (activeYear + 2 <= currentYear + 100) ? activeYear + 2 : " ";

            yearScrollCount = 0;

            const maxDay = getDaysInMonth(activeMonth, activeYear);
            if (activeDay > maxDay) {
                activeDay = maxDay;
            }
            updateDayDisplay();
        }
    });

    const month = document.getElementById("month");
    const month_opt0 = document.getElementById("month-option0");
    const month_opt1 = document.getElementById("month-option1");
    const month_opt2 = document.getElementById("month-option2");
    const month_opt3 = document.getElementById("month-option3");
    const month_opt4 = document.getElementById("month-option4");

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let activeMonth = new Date().getMonth(); // 0 = January

    let monthScrollCount = 0;

    function updateMonthDisplay() {
        month_opt0.innerHTML = (activeMonth - 2 >= 0) ? monthNames[activeMonth - 2] : "&nbsp;";
        month_opt1.innerHTML = (activeMonth - 1 >= 0) ? monthNames[activeMonth - 1] : "&nbsp;";
        month_opt2.innerHTML = monthNames[activeMonth];
        month_opt3.innerHTML = (activeMonth + 1 <= 11) ? monthNames[activeMonth + 1] : "&nbsp;";
        month_opt4.innerHTML = (activeMonth + 2 <= 11) ? monthNames[activeMonth + 2] : "&nbsp;";
    }

    updateMonthDisplay();

    month.addEventListener("wheel", (e) => {
        e.preventDefault();
        monthScrollCount++;

        if (monthScrollCount >= scrollThreshold) {
            if (e.deltaY > 0 && activeMonth < 11) {
                activeMonth++;
            } else if (e.deltaY < 0 && activeMonth > 0) {
                activeMonth--;
            }

            updateMonthDisplay();
            monthScrollCount = 0;

            const maxDay = getDaysInMonth(activeMonth, activeYear);
            if (activeDay > maxDay) {
                activeDay = maxDay;
            }
            updateDayDisplay();
        }
    });

    const day = document.getElementById("day");
    const day_opt0 = document.getElementById("day-option0");
    const day_opt1 = document.getElementById("day-option1");
    const day_opt2 = document.getElementById("day-option2");
    const day_opt3 = document.getElementById("day-option3");
    const day_opt4 = document.getElementById("day-option4");

    let activeDay = new Date().getDate(); // 1-based day

    let dayScrollCount = 0;

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }


    function updateDayDisplay() {
        const maxDay = getDaysInMonth(activeMonth, activeYear);

        if (activeDay > maxDay) activeDay = maxDay;

        day_opt0.innerHTML = (activeDay - 2 >= 1) ? activeDay - 2 : "&nbsp;";
        day_opt1.innerHTML = (activeDay - 1 >= 1) ? activeDay - 1 : "&nbsp;";
        day_opt2.innerHTML = activeDay;
        day_opt3.innerHTML = (activeDay + 1 <= maxDay) ? activeDay + 1 : "&nbsp;";
        day_opt4.innerHTML = (activeDay + 2 <= maxDay) ? activeDay + 2 : "&nbsp;";
    }


    updateDayDisplay();

    day.addEventListener("wheel", (e) => {
        e.preventDefault();
        dayScrollCount++;

        if (dayScrollCount >= scrollThreshold) {
            const maxDay = getDaysInMonth(activeMonth, activeYear);

            if (e.deltaY > 0 && activeDay < maxDay) {
                activeDay++;
            } else if (e.deltaY < 0 && activeDay > 1) {
                activeDay--;
            }

            updateDayDisplay();
            dayScrollCount = 0;
        }
    });
});



