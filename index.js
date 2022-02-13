'use strict';

const TOTAL_YEARS = 100; // Hope you live to 100.

const birthdateForm = (() => {
    const form = document.createElement('form');
    form.id = 'birthdate-form';

    const birthdate = document.createElement('input');
    birthdate.id = 'birthdate';
    birthdate.required = true;
    birthdate.type = 'date';
    form.append(birthdate);

    const submit = document.createElement('input');
    submit.type = 'submit';
    form.append(submit);

    return form;
})();

// Creates the timeline and fills in the appropriate amount of circles for the
// given birthdate.
// @param birthdate Date birthdate to start from.
// @returns Element the timeline
const createTimeline = birthdate => {
    const timeline = document.createElement('div');
    timeline.id = 'timeline';

    const years = Array(TOTAL_YEARS);
    for (let i = 0; i < TOTAL_YEARS; i++) {
        const year = document.createElement('div');
        year.id = `year-${i}`;
        years[i] = year;

        const weeks = Array(52);
        for (let i = 0; i < 52; i++) {
            const week = document.createElement('div');
            week.id = `week-${i}`;
            weeks[i] = week;
        }

        year.append(...weeks);
    }

    timeline.append(...years);

    return timeline;
};

// Adds the timeline element to the root div.
// @returns undefined
const mountTimeline = timeline => {
    document.querySelector('#root').append(timeline);
};

(() => {
    // Adds the birthdate form element to the root div.
    // @returns undefined
    const mountBirthdateForm = () => {
        document.querySelector('#root').prepend(birthdateForm);
    };

    const unmountBirthdateForm = () => {
        birthdateForm.remove();
        console.log(birthdateForm);
    };

    // Displays an error as a paragraph element below the birthdate form.
    // @param errorStr String the error string to be displayed
    // @returns undefined
    const displayBirthdateError = errorStr => {
        const errorP = document.createElement('p');
        errorP.id = 'birthdate-error';
        errorP.append(errorStr);

        birthdateForm.append(errorP);
    };

    // Removes the error paragraph element below the birthdate form, if it exists
    // @returns undefined
    const clearBirthdateError = () => {
        const errorP = birthdateForm.querySelector('#birthdate-error');

        if (errorP) {
            errorP.remove();
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        mountBirthdateForm();

        birthdateForm.onsubmit = event => {
            event.preventDefault();

            clearBirthdateError();

            const birthdateStr = event.target.querySelector('#birthdate').value;

            if (!birthdateStr) {
                displayBirthdateError('Please enter a valid date.')
            }

            let birthdate;
            try {
                birthdate = new Date(birthdateStr);

                if (birthdate > new Date()) {
                    displayBirthdateError('Please enter a date that is not in the future.');
                }

                unmountBirthdateForm();
                mountTimeline(createTimeline(birthdate));
            } catch {
                displayBirthdateError('Please enter a valid date.');
            }
        };
    })
})();