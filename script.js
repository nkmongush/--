document.addEventListener('DOMContentLoaded', function () {
    // ... existing code ...
    const mainContent = document.getElementById('content');
    const greetingText = mainContent.querySelector('#greeting');
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
        let pageViews = localStorage.getItem('pageViews') ? parseInt(localStorage.getItem('pageViews')) : 0;
        pageViews++;
        localStorage.setItem('pageViews', pageViews.toString());
        console.log('Количество просмотров:', pageViews);
    }
    updatePageViews();

    // Проверка если пользователь зарегистрирован
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        enableSlides();
        isRegistered = true
    }
    function enableSlides() {
        console.log('Слайды разрешены');
    }
    if (isRegistered) {
        enableSlides()
    }

    const modal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('registrationForm');
    const closeModal = document.querySelector('.close-modal');
    const mainPageLink = document.getElementById('mainPageLink');

    // Показать модальное окно при клике по ссылке
    mainPageLink.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'block';
    });


    // Закрыть модальное окно при клике на крестик
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закрыть модальное окно при клике вне модального окна
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });


    registrationForm.addEventListener('submit', function (event) {
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
            modal.style.display = 'none';
            // Сохраняем данные в localStorage
            localStorage.setItem('registrationData', JSON.stringify({ name, date, gender }));
            const token = generateToken();
            localStorage.setItem('userToken', token);
            enableSlides();
            if (currentPath.includes('index.html')) {
                const registrationData = localStorage.getItem('registrationData');
                if (registrationData) {
                    const data = JSON.parse(registrationData);
                    greetingText.textContent = `Добро пожаловать, ${data.name}!`;
                }
            }
            // Обновляем профиль, если находимся на странице профиля
            if (currentPath.includes('profile.html')) {
                updateProfileDisplay();
            }

        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    if (currentPath.includes('index.html')) {
        const registrationData = localStorage.getItem('registrationData');
        if (registrationData) {
            const data = JSON.parse(registrationData);
            greetingText.textContent = `Добро пожаловать, ${data.name}!`;
        }
    }

    function updateProfileDisplay() {
        const profileSlide = document.getElementById('profile-slide');
        const nameDiv = document.getElementById('name');
        const dateDiv = document.getElementById('date');
        const genderDiv = document.getElementById('gender');
        const registrationData = localStorage.getItem('registrationData');
        if (registrationData) {
            const data = JSON.parse(registrationData);
            nameDiv.textContent = `Имя: ${data.name}`;
            dateDiv.textContent = `Дата рождения: ${data.date}`;
            genderDiv.textContent = `Пол: ${data.gender}`;
            profileSlide.style.display = 'block';
        }
    }

    // Код для страницы профиля
    if (currentPath.includes('profile.html')) {
        updateProfileDisplay()
        const profileSlide = document.getElementById('profile-slide');
        const nameDiv = document.getElementById('name');
        const dateDiv = document.getElementById('date');
        const genderDiv = document.getElementById('gender');
        const editProfileButton = document.getElementById('editProfile');
        const editForm = document.getElementById('editForm');
        const editResult = document.getElementById('editResult');
        const registrationData = localStorage.getItem('registrationData');

        editProfileButton.addEventListener('click', () => {
            profileSlide.style.display = 'none';
            editForm.style.display = 'block'

            const editNameInput = document.getElementById('editName');
            const editDateInput = document.getElementById('editDate');
            const genderInputs = editForm.querySelectorAll('input[name="editGender"]');
            const data = JSON.parse(registrationData);
            editNameInput.value = data.name;
            editDateInput.value = data.date;
            genderInputs.forEach(input => {
                if (input.value === data.gender) {
                    input.checked = true
                }
            });

        });
        editForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const editNameInput = document.getElementById('editName');
            const editDateInput = document.getElementById('editDate');
            const genderInputs = editForm.querySelectorAll('input[name="editGender"]');
            const editName = editNameInput.value;
            const editDate = editDateInput.value;
            let editGender;
            genderInputs.forEach(input => {
                if (input.checked) {
                    editGender = input.value;
                }
            });
            const namePattern = /^[А-ЯЁ][а-яё]+$/;
            if (!namePattern.test(editName)) {
                editResult.textContent = "Имя должно начинаться с заглавной буквы и содержать только кириллические буквы.";
                editResult.style.color = 'red';
                return;
            }

            const editData = { name: editName, date: editDate, gender: editGender }

            localStorage.setItem('registrationData', JSON.stringify(editData));
            updateProfileDisplay()
            editForm.style.display = 'none';
            editResult.textContent = "Профиль успешно изменён!";
            editResult.style.color = 'green';
            setTimeout(() => {
                editResult.textContent = '';
            }, 3000)
        });

    }


    if (currentPath.includes('test.html')) {
        const quizForm = document.getElementById('quiz');
        const resultsDiv = document.getElementById('results');

        quizForm.addEventListener('submit', function (event) {
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
                const userAnswer = document.querySelector(`input[name="${question}"]:checked, input[name="${question}"]`);
                let correctAnswer = answers[question];
                if (userAnswer) {
                    let isCorrect;
                    if (userAnswer.type === 'text') {
                        if (userAnswer.value.trim() === '') {
                            resultsHTML += `<p><span>❌</span> Вопрос ${question}: Вы не ответили. Правильный ответ: ${correctAnswer}.</p>`;
                            continue;
                        }
                        isCorrect = userAnswer.value === correctAnswer;
                    } else {
                        isCorrect = userAnswer.value === correctAnswer
                    }

                    if (isCorrect) {
                        score++;
                        resultsHTML += `<p><span>✅</span> Вопрос ${question}: Ваш ответ верный.</p>`;
                    } else {
                        resultsHTML += `<p><span>❌</span> Вопрос ${question}: Ваш ответ неверный. Правильный ответ: ${correctAnswer}.</p>`;
                    }

                } else {
                    resultsHTML += `<p><span>❌</span> Вопрос ${question}: Вы не ответили. Правильный ответ: ${correctAnswer}.</p>`;
                }
            }

            resultsDiv.innerHTML = `${userName} Вы набрали ${score} из 6 баллов. <br> ${resultsHTML}`;
            resultsDiv.style.backgroundColor = score >= 5 ? "lightgreen" : "lightcoral";
            resultsDiv.style.padding = "10px";
            resultsDiv.style.border = "1px solid #ccc";
        });
    }
    const tabs = document.querySelector('.tabs');
    const tabButtons = tabs.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');


    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
            const selectedButton = document.querySelector(`button[data-tab="${tabId}"]`)
            selectedButton.classList.add('active');
        }
    }

    tabs.addEventListener('click', function (event) {
        if (event.target.classList.contains('tab-button')) {
            const tabId = event.target.getAttribute('data-tab');
            showTab(tabId)
        }
    });
    const firstTab = document.querySelector('.tab-button.active');
    if (firstTab) {
        showTab(firstTab.getAttribute('data-tab'))
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