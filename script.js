document.addEventListener('DOMContentLoaded', function () {

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
    const currentPath = window.location.pathname;
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

    // --- Поиск по словарю ---
    if (currentPath.includes('glossary.html')) {
        try {
            const searchInput = document.getElementById('search-term');
            const searchButton = document.getElementById('search-button');
            const endSearchButton = document.getElementById('end-search-button');
            const glossaryList = document.getElementById('glossary-list');
            const glossaryItems = glossaryList ? glossaryList.querySelectorAll('li') : null;
            let resultsFound = false
            if (searchButton) {
                searchButton.addEventListener('click', function (event) {
                    event.preventDefault()
                    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                    endSearchButton.style.display = 'inline-block';
                    resultsFound = false
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
                        alert('По запросу ничего не найдено.')
                    }
                });
            }

            if (endSearchButton) {
                endSearchButton.addEventListener('click', function (event) {
                    event.preventDefault()
                    endSearchButton.style.display = 'none';
                    if (searchInput) {
                        searchInput.value = '';
                    }
                    if (glossaryItems) {
                        glossaryItems.forEach(item => {
                            item.style.display = 'flex';
                        });
                    }
                });
            }

        } catch (error) {
            console.error('Ошибка на странице словаря:', error)
        }
    }
    if (currentPath.includes('test.html')) {
        try {
            const quizDiv = document.getElementById('quiz');
            const resultsDiv = document.getElementById('results');
            const checkTestButton = document.getElementById('checkTestButton')

            if (checkTestButton) {
                checkTestButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    const registrationData = localStorage.getItem('registrationData');
                    let userName = 'Пользователь';

                    if (registrationData) {
                        const data = JSON.parse(registrationData);
                        userName = data.name
                    }
                    let score = 0;
                    const answers = {
                        q1: 'Солдат-76',
                        q2: 'Сотрясение земли',
                        q3: 'C',
                        q4: 'A',
                        q5: 'D',
                        q6: 'A'
                    };
                    let resultsHTML = '';
                    for (const question of Object.keys(answers)) {
                        const userAnswer = quizDiv.querySelector(`input[name="${question}"]:checked, input[name="${question}"]`);
                        let correctAnswer = answers[question];
                        let questionElement = quizDiv.querySelector(`input[name="${question}"]`).closest('div');
                        let correctAnswerElement = questionElement.querySelector('.correct-answer');
                        if (!correctAnswerElement) {
                            correctAnswerElement = document.createElement('p');
                            correctAnswerElement.classList.add('correct-answer')
                            questionElement.appendChild(correctAnswerElement)
                        }
                        correctAnswerElement.textContent = `Правильный ответ: ${correctAnswer}`;

                        if (userAnswer) {
                            let isCorrect;
                            if (userAnswer.type === 'text') {
                                if (userAnswer.value.trim() === '') {
                                    resultsHTML += `<p><span>❌</span> Вопрос ${question}: Вы не ответили.</p>`;
                                    continue;
                                }
                                isCorrect = userAnswer.value === correctAnswer;
                            } else {
                                isCorrect = userAnswer.value === correctAnswer;
                            }
                            if (isCorrect) {
                                score++;
                                resultsHTML += `<p><span>✅</span> Вопрос ${question}: Ваш ответ верный.</p>`;
                            } else {
                                resultsHTML += `<p><span>❌</span> Вопрос ${question}: Ваш ответ неверный.</p>`;
                            }
                        } else {
                            resultsHTML += `<p><span>❌</span> Вопрос ${question}: Вы не ответили.</p>`;
                        }
                    }
                    resultsDiv.innerHTML = `${userName} Вы набрали ${score} из 6 баллов. <br> ${resultsHTML}`;
                    resultsDiv.style.backgroundColor = score >= 5 ? "lightgreen" : "lightcoral";
                    resultsDiv.style.padding = "10px";
                    resultsDiv.style.border = "1px solid #ccc";
                });
            }

        } catch (error) {
            console.error('Ошибка на странице теста:', error)
        }
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
