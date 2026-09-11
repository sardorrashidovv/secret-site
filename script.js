/* ========================================
   СЕКРЕТНОЕ ДОСЬЕ - ЛОГИКА
   Полный функционал интерактивного сайта
   ======================================== */

// ========== КОНФИГУРАЦИЯ ==========
// ИЗМЕНИ ЭТИ ПАРАМЕТРЫ НА СВОИ
const CONFIG = {
    friendName: "Умутай",           // Замени на имя подруги
    musicPath: "music/song.mp3",     // Путь к музыкальному файлу
};

// ========== ВОПРОСЫ ВИКТОРИНЫ ==========
// ИЗМЕНИ ВОПРОСЫ, ВАРИАНТЫ И ПРАВИЛЬНЫЕ ОТВЕТЫ
const QUIZ_QUESTIONS = [
    {
        question: "Какой мой любимый фильм?",
        options: ["Аватар", "Матрица", "Интерстеллар", "Гарри Поттер"],
        correct: 2  // Индекс правильного ответа (0, 1, 2 или 3)
    },
    {
        question: "Какое мое любимое блюдо?",
        options: ["Пицца", "Суши", "Паста", "Бургер"],
        correct: 1
    },
    {
        question: "Когда мой день рождения?",
        options: ["Январь", "Май", "Июль", "Декабрь"],
        correct: 0
    },
    {
        question: "Мой любимый цвет?",
        options: ["Красный", "Синий", "Зелёный", "Жёлтый"],
        correct: 1
    },
    {
        question: "Что я люблю делать в свободное время?",
        options: ["Спать", "Рисовать", "Читать", "Танцевать"],
        correct: 2
    }
];

// ========== ХАРАКТЕРИСТИКИ ДЛЯ ГЕНЕРАТОРА ==========
// ДОБАВЬ СВОИ СМЕШНЫЕ ХАРАКТЕРИСТИКИ
const CHARACTERISTICS = [
    "😂 Профессиональный генератор хаоса",
    "💅 Эксперт по красивому существованию",
    "🧠 2% логики, 98% уверенности",
    "🍟 Главный специалист по исчезновению чужой еды",
    "👑 Сертифицированная легенда",
    "🎭 Актриса в фильме 'Моя жизнь'",
    "⚡ Электризующая личность",
    "🌟 Звезда собственного шоу",
    "🎨 Художница жизни",
    "🚀 Готова покорять небо",
    "💎 Драгоценный камень",
    "🔥 Огонь в сердце",
    "🌈 Радуга после дождя",
    "🎪 Главная звезда цирка",
    "💝 Подарок для мира"
];

// ========== ОТВЕТЫ НА ТЕСТ ==========
const TEST_RESPONSES = [
    "Неверно. Ты явно скромничаешь.",
    "Система считает, что это слишком мало.",
    "Ошибка системы. Значение должно быть больше.",
    "Вот это уже ближе к правде 😂"
];

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let currentScreen = 1;
let quizAnswers = [];
let secretClickCount = 0;
let musicPlaying = false;

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Устанавливаем имя подруги
    document.getElementById('displayName').textContent = CONFIG.friendName;
    
    // Инициализируем викторину
    loadQuizQuestion(0);
    
    // Добавляем слушатели для музыки
    const musicBtn = document.getElementById('musicBtn');
    musicBtn.addEventListener('click', toggleMusic);
    
    // Добавляем слушателя для секретной кнопки
    const secretZone = document.getElementById('secretClickZone');
    secretZone.addEventListener('click', secretClick);
    
    // Показываем первый экран
    showScreen(1);
}

// ========== НАВИГАЦИЯ ПО ЭКРАНАМ ==========
function showScreen(screenNumber) {
    // Скрываем все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    const activeScreen = document.querySelector(`.screen-${screenNumber}`);
    if (activeScreen) {
        activeScreen.classList.add('active');
        currentScreen = screenNumber;
    }
    
    // Обновляем активную кнопку навигации
    updateNavigationButtons();
}

function goToScreen(screenNumber) {
    showScreen(screenNumber);
}

function nextScreen() {
    if (currentScreen < 6) {
        showScreen(currentScreen + 1);
    }
}

function prevScreen() {
    if (currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
}

function updateNavigationButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        if (index + 1 === currentScreen) {
            btn.style.background = 'linear-gradient(135deg, #ff006e, #8338ec)';
            btn.style.borderColor = '#ff006e';
        } else {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

// ========== ТЕСТ (ЭКРАН 3) ==========
function handleTestAnswer(answerId) {
    const responses = TEST_RESPONSES;
    const responseIndex = getAnswerIndex(answerId);
    const responseText = responses[responseIndex];
    
    // Показываем ответ
    const testResponse = document.getElementById('testResponse');
    document.getElementById('testResponseText').textContent = responseText;
    testResponse.style.display = 'block';
    
    // Через 2 секунды переходим дальше
    setTimeout(() => {
        nextScreen();
        testResponse.style.display = 'none';
    }, 2000);
}

function getAnswerIndex(answerId) {
    const answers = {
        'answer1': 0,
        'answer2': 1,
        'answer3': 2,
        'answer4': 3
    };
    return answers[answerId] || 0;
}

// ========== ВИКТОРИНА (ЭКРАН 4) ==========
function loadQuizQuestion(questionIndex) {
    const question = QUIZ_QUESTIONS[questionIndex];
    const totalQuestions = QUIZ_QUESTIONS.length;
    
    // Обновляем прогресс
    document.getElementById('currentQuestion').textContent = questionIndex + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Обновляем вопрос
    document.getElementById('quizQuestion').textContent = question.question;
    
    // Обновляем варианты ответов
    const quizOptions = document.getElementById('quizOptions');
    quizOptions.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectQuizOption(index, questionIndex);
        
        // Если уже был выбран ответ, подсвечиваем его
        if (quizAnswers[questionIndex] === index) {
            optionBtn.classList.add('selected');
        }
        
        quizOptions.appendChild(optionBtn);
    });
    
    // Обновляем кнопки навигации
    updateQuizButtons(questionIndex, totalQuestions);
}

function selectQuizOption(optionIndex, questionIndex) {
    quizAnswers[questionIndex] = optionIndex;
    loadQuizQuestion(questionIndex);
}

function updateQuizButtons(currentIndex, totalQuestions) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Показываем/скрываем кнопки
    prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentIndex < totalQuestions - 1 ? 'block' : 'none';
    submitBtn.style.display = currentIndex === totalQuestions - 1 ? 'block' : 'none';
}

function nextQuestion() {
    const currentIndex = parseInt(document.getElementById('currentQuestion').textContent) - 1;
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        loadQuizQuestion(currentIndex + 1);
    }
}

function prevQuestion() {
    const currentIndex = parseInt(document.getElementById('currentQuestion').textContent) - 1;
    if (currentIndex > 0) {
        loadQuizQuestion(currentIndex - 1);
    }
}

function submitQuiz() {
    // Считаем правильные ответы
    let correctCount = 0;
    quizAnswers.forEach((answer, index) => {
        if (answer === QUIZ_QUESTIONS[index].correct) {
            correctCount++;
        }
    });
    
    // Определяем результат
    let resultMessage = '';
    if (correctCount <= 1) {
        resultMessage = "Нам нужно поговорить 😂";
    } else if (correctCount <= 3) {
        resultMessage = "Неплохо.";
    } else if (correctCount === 4) {
        resultMessage = "Очень хорошо.";
    } else if (correctCount === 5) {
        resultMessage = "Официально лучший человек для этой должности.";
    }
    
    // Показываем результат в алерте
    showResultModal(correctCount, resultMessage);
}

function showResultModal(correctCount, message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeInDown 0.5s ease-out;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1));
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 0, 110, 0.5);
        border-radius: 30px;
        padding: 50px;
        text-align: center;
        max-width: 500px;
        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    content.innerHTML = `
        <h2 style="font-size: 42px; margin-bottom: 20px; background: linear-gradient(135deg, #ff006e, #8338ec); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">РЕЗУЛЬТАТ</h2>
        <p style="font-size: 32px; font-weight: 700; color: #ff006e; margin-bottom: 20px;">${correctCount} / ${QUIZ_QUESTIONS.length}</p>
        <p style="font-size: 24px; color: white; margin-bottom: 40px;">${message}</p>
        <button onclick="this.closest('div').remove()" style="
            background: linear-gradient(135deg, #ff006e, #8338ec);
            color: white;
            border: none;
            padding: 14px 35px;
            border-radius: 15px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            box-shadow: 0 10px 30px rgba(255, 0, 110, 0.4);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 40px rgba(255, 0, 110, 0.6)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(255, 0, 110, 0.4)';">
            Закрыть
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Запускаем конфетти
    createConfetti();
}

// ========== ГЕНЕРАТОР ХАРАКТЕРИСТИК (ЭКРАН 5) ==========
function generateCharacteristic() {
    const randomIndex = Math.floor(Math.random() * CHARACTERISTICS.length);
    const characteristic = CHARACTERISTICS[randomIndex];
    
    const display = document.getElementById('characteristicDisplay');
    document.getElementById('characteristicText').textContent = characteristic;
    display.style.display = 'block';
    
    // Анимация появления
    display.style.animation = 'none';
    setTimeout(() => {
        display.style.animation = 'popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }, 10);
}

// ========== МУЗЫКА ==========
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (musicPlaying) {
        audio.pause();
        btn.textContent = '🎵 Включить музыку';
        btn.classList.remove('playing');
        musicPlaying = false;
    } else {
        audio.play().catch(err => {
            console.log('Ошибка при воспроизведении музыки:', err);
            alert('Не удалось включить музыку. Убедись, что файл /music/song.mp3 загружен.');
        });
        btn.textContent = '🔇 Музыка включена';
        btn.classList.add('playing');
        musicPlaying = true;
    }
}

// ========== СЕКРЕТНАЯ КОМНАТА ==========
function secretClick() {
    secretClickCount++;
    
    // После 7 кликов открываем секретную комнату
    if (secretClickCount >= 7) {
        showScreen(7);
        createConfetti();
        secretClickCount = 0;
    }
}

// ========== КОНФЕТТИ ==========
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 8 + 4;
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#fb5607', '#ffbe0b'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: 1;
        `;
        
        container.appendChild(confetti);
        
        // Анимация падения конфетти
        let top = -10;
        let left = parseFloat(confetti.style.left);
        const speed = Math.random() * 3 + 2;
        const swingAmount = Math.random() * 50 - 25;
        
        const interval = setInterval(() => {
            top += speed;
            const swing = Math.sin((top / 100) * Math.PI) * (swingAmount / 100);
            confetti.style.top = top + 'vh';
            confetti.style.left = (left + swing) + '%';
            confetti.style.opacity = 1 - (top / 100);
            
            if (top > 100) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 20);
    }
}

// ========== ПАСХАЛКИ ==========
// Пасхалка 1: Двойной клик на заголовок
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h1, h2, .warning-title, .quiz-title');
    headings.forEach(heading => {
        heading.addEventListener('dblclick', function() {
            this.style.animation = 'spin 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'none';
            }, 600);
        });
    });
});

// Пасхалка 2: Клавиша "Ч" открывает/закрывает секретную комнату
document.addEventListener('keydown', function(e) {
    if (e.key === 'ч' || e.key === 'Ч') {
        showScreen(7);
        createConfetti();
    }
});

// Добавляем стиль для спина
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(360deg); }
    }
`;
document.head.appendChild(style);

// ========== ЛОГИРОВАНИЕ ДЛЯ ОТЛАДКИ ==========
console.log('🎁 Секретное досье загружено!');
console.log('Подруга:', CONFIG.friendName);
console.log('Нажми F12 чтобы открыть консоль разработчика');
console.log('Секрет: Нажми "Ч" или кликай 7 раз на ✨ внизу');
