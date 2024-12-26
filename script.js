document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.forms.auth;
    const nameDiv = document.getElementById('name');
    const dateDiv = document.getElementById('date');
    const genderDiv = document.getElementById('gender');
    const resultDiv = document.getElementById('result')
    const repeatButton = document.getElementById('btn');

    authForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('nameInput');
        const dateInput = document.getElementById('dateInput');
        const genderInput = authForm.elements.gender;

        let nameValue = nameInput.value;
        let dateValue = dateInput.value;
        let genderValue = "";


        for (const radio of genderInput) {
            if (radio.checked) {
                genderValue = radio.value;
            }
        }

        const namePattern = /^[А-ЯЁ][а-яё]+$/;
        if (!namePattern.test(nameValue)) {
            resultDiv.innerHTML = "Имя должно начинаться с заглавной буквы и содержать только кириллические буквы.";
            resultDiv.style.color = 'red';
            return;
        }

        nameDiv.textContent = `Имя: ${nameValue}`;
        dateDiv.textContent = `Дата рождения: ${dateValue}`;
        genderDiv.textContent = `Пол: ${genderValue}`;
        resultDiv.innerHTML = "";
    });

    repeatButton.addEventListener('click', function () {
        authForm.reset();
        nameDiv.textContent = '';
        dateDiv.textContent = '';
        genderDiv.textContent = '';
        resultDiv.innerHTML = "";
        resultDiv.style.color = 'black';
    });

});
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const images = gallery.querySelectorAll('img');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.style.display = 'none';
            img.classList.remove('active');
            img.style.opacity = 0;

            if (index === currentIndex) {
                img.style.display = 'block';
                img.classList.add('active');
                setTimeout(() => {
                    img.style.opacity = 1;
                }, 10);
            }
        });

        // Отключаем кнопку "Назад" на первом изображении
        if (currentIndex === 0) {
            prevButton.disabled = true;
            prevButton.style.backgroundColor = "#59412d";
            prevButton.style.cursor = "not-allowed";
        } else {
            prevButton.disabled = false;
            prevButton.style.backgroundColor = "#ff8f00";
            prevButton.style.cursor = "pointer";
        }

        // Отключаем кнопку "Вперед" на последнем изображении
        if (currentIndex === images.length - 1) {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = "#59412d";
            nextButton.style.cursor = "not-allowed";
        } else {
            nextButton.disabled = false;
            nextButton.style.backgroundColor = "#ff8f00";
            nextButton.style.cursor = "pointer";
        }
    }


    updateCarousel();

    nextButton.addEventListener('click', function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });


    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const images = gallery.querySelectorAll('img');
    let currentIndex = 0;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.style.display = 'none';
            img.classList.remove('active');

            if (index === currentIndex) {
                img.style.display = 'block';
                img.classList.add('active');
            }
        });
    }

    updateCarousel();

    gallery.addEventListener('click', function (event) {
        if (event.target === gallery) {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            updateCarousel();
        }
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            updateCarousel();
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            updateCarousel();
        }
    });



});
document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('content');
    const text = mainContent.querySelector('h1');

    const words = text.textContent.split(' ');
    text.textContent = '';
    let currentIndex = 0;

    function animateWord() {
        if (currentIndex < words.length) {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = words[currentIndex] + ' ';
            wordSpan.style.opacity = 0;
            wordSpan.style.transition = 'opacity 0.5s ease-in-out';
            mainContent.appendChild(wordSpan);


            setTimeout(() => {
                wordSpan.style.opacity = 1;
            }, 10);

            currentIndex++;
            setTimeout(animateWord, 200);
        }
    }

    animateWord();
});
document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.forms.auth;
    const nameDiv = document.getElementById('name');
    const dateDiv = document.getElementById('date');
    const genderDiv = document.getElementById('gender');
    const resultDiv = document.getElementById('result');
    const registrationSlide = document.getElementById('registration-slide');
    const profileSlide = document.getElementById('profile-slide');

    const repeatButton = document.getElementById('btn');
    const userData = localStorage.getItem('userData');

    function displayProfile(userData) {
        const parsedData = JSON.parse(userData);
        nameDiv.textContent = `Имя: ${parsedData.name}`;
        dateDiv.textContent = `Дата рождения: ${parsedData.date}`;
        genderDiv.textContent = `Пол: ${parsedData.gender}`;
        registrationSlide.style.display = 'none';
        profileSlide.style.display = 'flex';
    }

    if (userData) {
        displayProfile(userData);
    } else {
        registrationSlide.style.display = 'flex';
        profileSlide.style.display = 'none';
    }


    authForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameInput = document.getElementById('nameInput');
        const dateInput = document.getElementById('dateInput');
        const genderInput = authForm.elements.gender;

        let nameValue = nameInput.value;
        let dateValue = dateInput.value;
        let genderValue = "";
        for (const radio of genderInput) {
            if (radio.checked) {
                genderValue = radio.value;
            }
        }
        const namePattern = /^[А-ЯЁ][а-яё]+$/;
        if (!namePattern.test(nameValue)) {
            resultDiv.innerHTML = "Имя должно начинаться с заглавной буквы и содержать только кириллические буквы.";
            resultDiv.style.color = 'red';
            return;
        }

        const userData = {
            name: nameValue,
            date: dateValue,
            gender: genderValue
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        displayProfile(localStorage.getItem('userData'))

        resultDiv.innerHTML = "";
    });


    repeatButton.addEventListener('click', function () {
        authForm.reset();
        nameDiv.textContent = '';
        dateDiv.textContent = '';
        genderDiv.textContent = '';
        resultDiv.innerHTML = "";
        resultDiv.style.color = 'black';
        localStorage.removeItem('userData')
        registrationSlide.style.display = 'flex';
        profileSlide.style.display = 'none';
    });

});
document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quiz');
    const resultsDiv = document.getElementById('results');

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let score = 0;
        const answers = {
            q1: 'Солдат-76',
            q2: 'Сотрясение земли',
            q3: 'C',
            q4: 'A',
            q5: 'D',
            q6: 'A'
        };

        for (const question of Object.keys(answers)) {
            const userAnswer = document.querySelector(`input[name="${question}"]:checked`);

            if (userAnswer) {
                if (userAnswer.value === answers[question]) {
                    score++;
                }
            }
        }

        resultsDiv.innerHTML = `Вы набрали ${score} из 6 баллов.`;
        resultsDiv.style.backgroundColor = score >= 5 ? "lightgreen" : "lightcoral";
        resultsDiv.style.padding = "10px";
        resultsDiv.style.border = "1px solid #ccc";

    });
});
document.addEventListener('DOMContentLoaded', function () {
    const glossaryData = {
        "Танк": "Герой, способный поглощать большое количество урона и защищать свою команду.",
        "Дамагер": "Герой, наносящий высокий урон противникам.",
        "Поддержка": "Герой, который лечит и бафает союзников.",
        "Ульта": "Ультимативная способность героя.",
        "Контрпик": "Герой, наиболее эффективный против конкретного героя соперника."
    };

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        if (!searchTerm) {
            searchResults.textContent = 'Введите термин для поиска.';
            return;
        }
        const found = Object.keys(glossaryData).find(key => key.toLowerCase() === searchTerm);
        if (found) {
            const term = found;
            const definition = glossaryData[term];
            searchResults.innerHTML = `
                   <p><strong>${term}:</strong> ${definition}</p>
               `;
        } else {
            searchResults.textContent = 'Термин не найден в словаре.';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
    const initialTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    if (initialTab) {
        activateTab(initialTab)
    }
});