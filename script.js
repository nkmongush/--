document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    // --- Раздел профиля ---
    const profileSlide = document.getElementById('profile-slide');
    const nameDiv = document.getElementById('name');
    const dateDiv = document.getElementById('date');
    const genderDiv = document.getElementById('gender');
    const editProfileButton = document.getElementById('editProfile');
    const editForm = document.getElementById('editForm');
    const editNameInput = document.getElementById('editName');
    const editDateInput = document.getElementById('editDate');
    const editGenderInputs = document.querySelectorAll('input[name="editGender"]');
    const editResultDiv = document.getElementById('editResult');
    const resultDiv = document.getElementById('result');

    if (currentPath.includes('profile.html')) {
        if (profileSlide && nameDiv && dateDiv && genderDiv && editProfileButton && editForm && editNameInput && editDateInput && editGenderInputs && editResultDiv && resultDiv) {
            const registrationData = localStorage.getItem('registrationData');
            if (registrationData) {
                const data = JSON.parse(registrationData);
                nameDiv.textContent = `Имя: ${data.name}`;
                dateDiv.textContent = `Дата рождения: ${data.date}`;
                genderDiv.textContent = `Пол: ${data.gender}`;
                profileSlide.style.display = 'block';
            }

            editProfileButton.addEventListener('click', () => {
                profileSlide.style.display = 'none';
                editForm.style.display = 'block';
                const registrationData = localStorage.getItem('registrationData');
                if (registrationData) {
                    const data = JSON.parse(registrationData);
                    editNameInput.value = data.name;
                    editDateInput.value = data.date;
                    editGenderInputs.forEach(input => {
                        if (input.value === data.gender) {
                            input.checked = true;
                        }
                    });
                }
            });

            editForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const editName = editNameInput.value;
                const editDate = editDateInput.value;
                let editGender;
                editGenderInputs.forEach(input => {
                    if (input.checked) {
                        editGender = input.value;
                    }
                });
                const namePattern = /^[А-ЯЁ][а-яё]+$/;
                if (!namePattern.test(editName)) {
                    editResultDiv.textContent = "Имя должно начинаться с заглавной буквы и содержать только кириллические буквы.";
                    editResultDiv.style.color = 'red';
                    return;
                }
                const editData = { name: editName, date: editDate, gender: editGender };
                localStorage.setItem('registrationData', JSON.stringify(editData));
                profileSlide.style.display = 'block';
                editForm.style.display = 'none';
                editResultDiv.textContent = "Профиль успешно изменён!";
                editResultDiv.style.color = 'green';
                setTimeout(() => {
                    editResultDiv.textContent = '';
                }, 3000);
            });
        } else {
            console.error("Ошибка: Один или несколько элементов профиля не найдены в DOM.");
        }
    }


    // --- Раздел вкладок ---
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        const tabButtons = tabs.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons && tabContents) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.dataset.tab;
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    button.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        } else {
            console.error("Ошибка: Элементы вкладок не найдены в DOM.");
        }
    }
    // --- Основной контент ---
    const mainContent = document.getElementById('content');
    const greetingText = mainContent ? mainContent.querySelector('#greeting') : null;
    const navLinks = document.querySelectorAll('header nav ul li a');
    let isRegistered = false;
    // Функция генерации токена (простая)
    function generateToken() {
        return Math.random().toString(36).substring(2);
    }
    function setActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            if (event.target.getAttribute('href') !== '#') {
                setActiveNavLink(this);
            }
        });
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            setActiveNavLink(link);
        }
    });

    function updatePageViews() {
        try {
            let pageViews = localStorage.getItem('pageViews') ? parseInt(localStorage.getItem('pageViews')) : 0;
            pageViews++;
            localStorage.setItem('pageViews', pageViews.toString());
            console.log('Количество просмотров:', pageViews);
        } catch (error) {
            console.error('Ошибка при обновлении просмотров страниц:', error);
        }
    }
    updatePageViews();

    // Проверка если пользователь зарегистрирован
    const userToken = localStorage.getItem('userToken');
    try {
        if (userToken) {
            enableSlides();
            isRegistered = true
        }
    } catch (error) {
        console.error('Ошибка при проверке пользователя:', error)
    }
    function enableSlides() {
        console.log('Слайды разрешены');
    }
    if (isRegistered) {
        enableSlides()
    }

    const modal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('registrationForm');
    let closeModal = modal ? modal.querySelector('.close-modal') : null;
    let mainPageLink;
    if (document.getElementById('mainPageLink')) {
        mainPageLink = document.getElementById('mainPageLink');
        mainPageLink.addEventListener('click', function (event) {
            try {
                event.preventDefault();
                if (modal) {
                    modal.style.display = 'block';
                }
            } catch (error) {
                console.error('Ошибка при открытии модального окна:', error);
            }
        });
    }


    if (closeModal) {
        closeModal.addEventListener('click', function () {
            try {
                if (modal) {
                    modal.style.display = 'none';
                }
            } catch (error) {
                console.error('Ошибка при закрытии модального окна:', error);
            }
        });
    }


    // Закрыть модальное окно при клике вне модального окна
    window.addEventListener('click', function (event) {
        try {
            if (event.target === modal && modal) {
                modal.style.display = 'none';
            }
        } catch (error) {
            console.error('Ошибка при закрытии модального окна вне его:', error);
        }
    });
    // Проверка, был ли пользователь зарегистрирован
    const isFirstVisit = !localStorage.getItem('hasVisited');

    if (isFirstVisit && modal) {
        modal.style.display = 'block';
    }
    localStorage.setItem('hasVisited', 'true');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            try {
                event.preventDefault();
                const nameInput = document.getElementById('nameInput');
                const dateInput = document.getElementById('dateInput');
                const genderInputs = document.querySelectorAll('input[name="gender"]');
                const name = nameInput.value;
                const date = dateInput.value;
                let gender;
                genderInputs.forEach(input => {
                    if (input.checked) {
                        gender = input.value;
                    }
                });
                const namePattern = /^[А-ЯЁ][а-яё]+$/;
                if (!namePattern.test(name)) {
                    alert("Имя должно начинаться с заглавной буквы и содержать только кириллические буквы.");
                    return;
                }
                if (name && date && gender) {
                    isRegistered = true;
                    if (modal) {
                        modal.style.display = 'none';
                    }

                    // Сохраняем данные в localStorage
                    localStorage.setItem('registrationData', JSON.stringify({ name, date, gender }));
                    const token = generateToken();
                    localStorage.setItem('userToken', token);
                    enableSlides();
                    if (currentPath.includes('index.html')) {
                        const registrationData = localStorage.getItem('registrationData');
                        if (registrationData) {
                            const data = JSON.parse(registrationData);
                            if (greetingText) {
                                greetingText.textContent = `Добро пожаловать, ${data.name}!`;
                            }
                        }
                    }
                    // Обновляем профиль, если находимся на странице профиля
                    if (currentPath.includes('profile.html')) {
                        updateProfileDisplay();
                    }

                } else {
                    alert('Пожалуйста, заполните все поля.');
                }
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
        });
    }


    if (currentPath.includes('index.html')) {
        try {
            const registrationData = localStorage.getItem('registrationData');
            if (registrationData) {
                const data = JSON.parse(registrationData);
                if (greetingText) {
                    greetingText.textContent = `Добро пожаловать, ${data.name}!`;
                }
            }
        } catch (error) {
            console.error('Ошибка при обновлении приветствия:', error);
        }
    }

    if (currentPath.includes('glossary.html')) {
        const searchInput = document.getElementById('search-term');
        const searchButton = document.getElementById('search-button');
        const endSearchButton = document.getElementById('end-search-button');
        const glossaryList = document.getElementById('glossary-list');
        const glossaryItems = glossaryList ? glossaryList.querySelectorAll('li') : null;

        if (!searchInput || !searchButton || !endSearchButton || !glossaryList || !glossaryItems) {
            const errorMsg = "Ошибка: Не найдены элементы глоссария. Проверьте ID в HTML.";
            console.error(errorMsg);
            alert(errorMsg);
            return;
        }

        searchButton.addEventListener('click', function (event) {
            event.preventDefault();
            const searchTerm = searchInput.value.toLowerCase();
            endSearchButton.style.display = 'inline-block';
            let resultsFound = false;
            if (glossaryItems) {
                glossaryItems.forEach(item => {
                    const term = item.querySelector('.term').textContent.toLowerCase();
                    if (term.includes(searchTerm)) {
                        item.style.display = 'flex';
                        resultsFound = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
            if (!resultsFound) {
                alert('По запросу ничего не найдено.');
            }
        });
        endSearchButton.addEventListener('click', function (event) {
            event.preventDefault();
            endSearchButton.style.display = 'none';
            searchInput.value = '';
            if (glossaryItems) {
                glossaryItems.forEach(item => {
                    item.style.display = 'flex';
                });
            }
        });
    } else {
        const searchInput = document.getElementById('search-term');
        const searchButton = document.getElementById('search-button');
        const endSearchButton = document.getElementById('end-search-button');
        if (searchInput && searchButton && endSearchButton) {
            searchInput.remove();
            searchButton.remove();
            endSearchButton.remove();
        }
    }
    if (currentPath.includes('test.html')) {
        const quizDiv = document.getElementById('quiz');
        const resultsDiv = document.getElementById('results');
        const checkTestButton = document.getElementById('checkTestButton');
        const resetTestButton = document.getElementById('resetTestButton');
        // Error handling: Check for missing elements
        if (!quizDiv || !resultsDiv || !checkTestButton || !resetTestButton) {
            const errorMsg = "Ошибка: Не найдены элементы формы теста. Проверьте ID в HTML.";
            console.error(errorMsg);
            if (resultsDiv) {
                resultsDiv.innerHTML = `<p style="color: red;">${errorMsg}</p>`; //Display error to user
            }
            return; //Exit early if elements are missing
        }

        checkTestButton.addEventListener('click', function (event) {
            event.preventDefault();
            resultsDiv.innerHTML = ''; // Clear previous results

            const answers = {
                q1: 'солдат-76',
                q2: 'Сотрясение земли',
                q3: 'C',
                q4: 'A',
                q5: 'D',
                q6: 'B'
            };

            let score = 0;
            let feedback = '';

            try {
                for (let i = 1; i <= 6; i++) {
                    const question = `q${i}`;
                    let userAnswer;
                    //Error handling: Different question types
                    if (question === 'q1' || question === 'q2') {
                        userAnswer = quizDiv.querySelector(`input[name="${question}"]`).value.toLowerCase();
                    } else {
                        userAnswer = quizDiv.querySelector(`input[name="${question}"]:checked`).value;
                    }
                    if (question === 'q1' || question === 'q2') {
                        if (userAnswer.includes(answers[question].toLowerCase())) {
                            score++;
                            feedback += `<p>Вопрос ${i}: Верно!</p>`;
                        } else {
                            feedback += `<p>Вопрос ${i}: Неверно. Правильный ответ: ${answers[question]}</p>`;
                        }
                    } else {
                        if (userAnswer === answers[question]) {
                            score++;
                            feedback += `<p>Вопрос ${i}: Верно!</p>`;
                        } else {
                            feedback += `<p>Вопрос ${i}: Неверно. Правильный ответ: ${answers[question]}</p>`;
                        }
                    }
                }
                resultsDiv.innerHTML = `<h2>Ваш результат: ${score} из 6</h2>${feedback}`;

            } catch (error) {
                console.error("Ошибка при проверке ответов:", error);
                resultsDiv.innerHTML = `<p style="color: red;">Произошла ошибка при проверке ответов.</p>`; //Display error to the user
            }
        });
        resetTestButton.addEventListener('click', function (event) {
            event.preventDefault();
            resultsDiv.innerHTML = '';
            const inputs = quizDiv.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.type === 'radio') {
                    input.checked = false;
                } else if (input.type === 'text') {
                    input.value = '';
                }
            });
        });
    }
});
//галерея
document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('content');
    const navLinks = document.querySelectorAll('header nav ul li a');

    function setActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            if (event.target.getAttribute('href') !== '#') {
                setActiveNavLink(this);
            }
        });
    });

    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            setActiveNavLink(link);
        }
    });


    const gallery = document.querySelector('.gallery');
    const images = gallery.querySelectorAll('img');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const imageCounter = document.getElementById('image-counter');
    let currentIndex = 0;

    function updateCounter() {
        imageCounter.textContent = `Картинка ${currentIndex + 1} / ${images.length}`;
    }

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
        updateCounter()
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
