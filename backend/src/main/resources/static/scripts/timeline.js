/**
 * Creates and manages a single scrollable picker unit (e.g., for day, month, or year).
 * @param {HTMLElement} container - The DOM element to render the picker into.
 * @param {object} config - Configuration for the picker's behavior.
 * @returns {object} - An object with methods to control the picker.
 */
function createUnitPicker(container, config) {
    const template = document.getElementById('picker-template').content.cloneNode(true);
    container.appendChild(template);

    const picker = container.querySelector('.picker');
    const options = picker.querySelectorAll('.option');

    let { value, min, max, displayMap, scrollThreshold = 7 } = config;
    let scrollCount = 0;

    const updateDisplay = () => {
        const values = [-2, -1, 0, 1, 2].map(offset => value + offset);
        options.forEach((span, i) => {
            const currentValue = values[i];
            if (currentValue >= min && currentValue <= max) {
                span.textContent = displayMap ? displayMap[currentValue] : currentValue;
            } else {
                span.innerHTML = ' ';
            }
        });
    };

    picker.addEventListener("wheel", (e) => {
        e.preventDefault();
        scrollCount++;
        if (scrollCount < scrollThreshold) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        const newValue = Math.max(min, Math.min(max, value + direction));

        if (newValue !== value) {
            value = newValue;
            updateDisplay();
            if (config.onChange) config.onChange(value);
        }
        scrollCount = 0;
    });

    updateDisplay();

    return {
        getValue: () => value,
        setValue: (newValue) => {
            value = Math.max(min, Math.min(max, newValue));
            updateDisplay();
        },
        updateBounds: (newMin, newMax) => {
            min = newMin;
            max = newMax;
            value = Math.max(min, Math.min(max, value));
            updateDisplay();
        }
    };
}


function initializeDatePicker(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';

    const yearContainer = document.createElement('div');
    const monthContainer = document.createElement('div');
    const dayContainer = document.createElement('div');
    container.append(yearContainer, monthContainer, dayContainer);

    const today = new Date();
    const currentYear = today.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const dayPicker = createUnitPicker(dayContainer, {
        value: today.getDate(),
        min: 1,
        max: getDaysInMonth(today.getMonth(), currentYear),
    });

    const monthPicker = createUnitPicker(monthContainer, {
        value: today.getMonth(),
        min: 0,
        max: 11,
        displayMap: monthNames,
        onChange: () => {
            const newMaxDays = getDaysInMonth(monthPicker.getValue(), yearPicker.getValue());
            dayPicker.updateBounds(1, newMaxDays);
        }
    });

    const yearPicker = createUnitPicker(yearContainer, {
        value: currentYear,
        min: currentYear - 100,
        max: currentYear + 100,
        onChange: () => {
            const newMaxDays = getDaysInMonth(monthPicker.getValue(), yearPicker.getValue());
            dayPicker.updateBounds(1, newMaxDays);
        }
    });

    return {
        getSelectedDate: () => {
            const year = yearPicker.getValue();
            const month = (monthPicker.getValue() + 1).toString().padStart(2, '0');
            const day = dayPicker.getValue().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        setDate: (date) => {
            if (!(date instanceof Date) || isNaN(date)) return;
            yearPicker.setValue(date.getFullYear());
            monthPicker.setValue(date.getMonth());
            dayPicker.updateBounds(1, getDaysInMonth(date.getMonth(), date.getFullYear()));
            dayPicker.setValue(date.getDate());
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const addEventPanel = document.querySelector(".addTimelineEvent");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById('add-event-form');
    const lastingCheckbox = document.getElementById('lasting');
    const endDateContainer = document.querySelector('.end_date_picker');

    if (window.location.hash === "#add_event") {
        addEventPanel.style.transform = "translateX(0)";
        history.replaceState(null, '', window.location.pathname + window.location.search);

    }
    closeBtn.addEventListener("click", () => {
        addEventPanel.style.transform = "translateX(-22rem)";
    });

    const startDatePicker = initializeDatePicker('.start_date_picker');
    const endDatePicker = initializeDatePicker('.end_date_picker');

    lastingCheckbox.addEventListener('change', () => {
        endDateContainer.classList.toggle('hidden-date-picker', !lastingCheckbox.checked);
    });
    endDateContainer.classList.toggle('hidden-date-picker', !lastingCheckbox.checked);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const startDateStr = startDatePicker.getSelectedDate();
        const endDateStr = lastingCheckbox.checked ? endDatePicker.getSelectedDate() : null;

        if (endDateStr && new Date(startDateStr) > new Date(endDateStr)) {
            alert("The start date cannot be after the end date.");
            return;
        }

        const eventData = {
            eventName: form.eventName.value,
            eventDescription: form.eventDescription.value,
            eventStart: startDateStr,
            eventEnd: endDateStr,
        };

        console.log("Validation successful! Data to send:", eventData);

        fetch('/api/admin/timeline/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || `Server error: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success from backend:', data.message);
                alert('Event added successfully!');
                document.getElementById('add-event-form').reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert(`Failed to add event: ${error.message}`);
            });
    });

    form.addEventListener('reset', (e) => {
        const today = new Date();
        startDatePicker.setDate(today);
        endDatePicker.setDate(today);
        lastingCheckbox.checked = false;
        endDateContainer.classList.add('hidden-date-picker');
    });
});