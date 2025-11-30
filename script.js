// Получаем корневой элемент для приложения
const app = document.getElementById('app')

// Создаём базовую структуру навигации и основного контента
app.innerHTML = `
  <nav aria-label="Основное меню сайта LEISURE & FUN">
    <button id="homeBtn" class="active" aria-controls="content" aria-selected="true" role="tab">
      <span class="icon" aria-hidden="true">🏠</span> Главная
    </button>
    <button id="catalogBtn" aria-controls="content" aria-selected="false" role="tab">
      <span class="icon" aria-hidden="true">🛍</span> Каталог услуг
    </button>
    <button id="supportBtn" aria-controls="content" aria-selected="false" role="tab">
      <span class="icon" aria-hidden="true">📞</span> Поддержка
    </button>
  </nav>
  <main id="content" role="tabpanel" tabindex="0" aria-live="polite"></main>
  <div id="notification" class="notification" aria-live="polite"></div>
`

const content = document.getElementById('content')
const notification = document.getElementById('notification')

// Данные о развлечениях (из Telegram-бота)
const ENTERTAINMENT_DB = {
    "Москва": {
        "Автомобили": [
            {
                "name": "Музей автомобильных историй",
                "description": "Интерактивный музей ретро-автомобилей с возможностью посидеть в машинах",
                "prices": {"взрослый": 600, "детский": 400, "студенческий": 450},
                "working_hours": "10:00-22:00, без выходных",
                "age_restriction": "6+",
                "rating": 4.7,
                "url": "https://autostory.pro/",
                "reviews": {
                    "positive": [
                        "Потрясающая коллекция ретро-автомобилей в отличном состоянии",
                        "Детям разрешают посидеть в машинах, это вызывает восторг",
                        "Экскурсоводы знающие и интересно рассказывают",
                        "Удобное расположение в центре города",
                        "Часто проводят тематические мероприятия"
                    ],
                    "negative": [
                        "Цены на билеты немного завышены",
                        "В выходные очень много посетителей",
                        "Парковка рядом с музеем платная и часто занята",
                        "Недостаточно информации об отдельных экспонатах"
                    ]
                }
            },
            {
                "name": "E-GO картинг",
                "description": "Современный картинг-центр с электрическими картами и профессиональной трассой",
                "prices": {"10 минут": 900, "30 минут": 2200, "детский заезд": 600},
                "working_hours": "11:00-23:00 ежедневно",
                "age_restriction": "12+",
                "rating": 4.7,
                "url": "https://www.e-go-karting.ru",
                "reviews": {
                    "positive": [
                        "Современные электрические карты - тихо и экологично",
                        "Профессиональная трасса с интересной конфигурацией",
                        "Отличная система безопасности и качественная экипировка",
                        "Дружелюбные инструкторы, помогают новичкам",
                        "Чистые раздевалки и комфортная зона ожидания"
                    ],
                    "negative": [
                        "Цены выше среднего по рынку",
                        "В выходные большие очереди и длительное ожидание",
                        "Не все карты одинаково отзывчивые"
                    ]
                }
            }
        ],
        "История Родины": [
            {
                "name": "Московский Кремль",
                "description": "Главный историко-политический комплекс страны с музеями и соборами",
                "prices": {"территория": 0, "соборы": 700, "единый билет": 1000},
                "working_hours": "09:30-18:00, четверг - выходной",
                "age_restriction": "0+",
                "rating": 4.9,
                "url": "https://www.kreml.ru",
                "reviews": {
                    "positive": [
                        "Великолепный исторический комплекс, обязателен к посещению",
                        "Потрясающая архитектура и богатая история",
                        "Бесплатный вход на территорию - отличная возможность для бюджетного отдыха",
                        "Экскурсоводы высокого профессионального уровня",
                        "Прекрасные виды на город с территории Кремля"
                    ],
                    "negative": [
                        "Очень много туристов, особенно в летний сезон",
                        "Дорогие билеты в отдельные соборы и музеи",
                        "Длинные очереди в кассы в пиковые часы"
                    ]
                }
            },
            {
                "name": "Музей Победы на Поклонной горе",
                "description": "Мемориальный комплекс Победы в Великой Отечественной войне",
                "prices": {"основной": 400, "льготный": 300, "дети до 7 лет": 0},
                "working_hours": "10:00-20:30, понедельник - выходной",
                "age_restriction": "6+",
                "rating": 4.8,
                "url": "https://victorymuseum.ru",
                "reviews": {
                    "positive": [
                        "Очень впечатляющее и важное место памяти",
                        "Современная интерактивная экспозиция с использованием новейших технологий",
                        "Много подлинных экспонатов времен войны",
                        "Трогательные диорамы и световые шоу",
                        "Отличное место для патриотического воспитания детей"
                    ],
                    "negative": [
                        "Иногда слишком шумно из-за большого количества экскурсионных групп",
                        "Очереди в кассы в выходные дни могут занимать много времени",
                        "Некоторые залы требуют реставрации"
                    ]
                }
            }
        ],
        "Спорт": [
            {
                "name": "Спортивный комплекс Лужники",
                "description": "Один из крупнейших спортивных комплексов Европы с многочисленными секциями",
                "prices": {"экскурсия": 800, "тренировка": 1200, "бассейн": 700},
                "working_hours": "07:00-23:00 ежедневно",
                "age_restriction": "3+",
                "rating": 4.6,
                "url": "https://luzhniki.ru",
                "reviews": {
                    "positive": [
                        "Отличная инфраструктура мирового уровня",
                        "Профессиональное обслуживание и квалифицированные тренеры",
                        "Разнообразие спортивных секций для любого возраста",
                        "Чистота и порядок во всех помещениях",
                        "Регулярно проводятся спортивные мероприятия"
                    ],
                    "negative": [
                        "Высокие цены на некоторые услуги и абонементы",
                        "Тренажерные залы переполнены в часы пик",
                        "Сложно найти свободное парковочное место"
                    ]
                }
            }
        ]
    },
    "Санкт-Петербург": {
        "История Родины": [
            {
                "name": "Государственный Эрмитаж",
                "description": "Крупнейший художественный музей России и один из крупнейших в мире",
                "prices": {"входной билет": 500, "экскурсия": 800, "аудиогид": 300},
                "working_hours": "10:30-18:00, понедельник - выходной",
                "age_restriction": "6+",
                "rating": 4.9,
                "url": "https://www.hermitagemuseum.org",
                "reviews": {
                    "positive": [
                        "Великолепная коллекция мирового уровня, обязательна к посещению",
                        "Потрясающие интерьеры зимнего дворца производят неизгладимое впечатление",
                        "Огромное количество экспонатов, хватит на несколько дней осмотра",
                        "Профессиональные экскурсоводы с глубокими знаниями",
                        "Регулярно обновляются экспозиции"
                    ],
                    "negative": [
                        "Огромные очереди в высокий сезон, приходится ждать часами",
                        "Сложно осмотреть все за один день - слишком большая территория",
                        "Некоторые залы могут быть закрыты без предупреждения"
                    ]
                }
            },
            {
                "name": "Петропавловская крепость",
                "description": "Историческое ядро Санкт-Петербурга, уникальный памятник архитектуры",
                "prices": {"территория": 0, "собор": 450, "экскурсия": 600},
                "working_hours": "09:00-20:00 ежедневно",
                "age_restriction": "0+",
                "rating": 4.7,
                "url": "https://www.spbmuseum.ru",
                "reviews": {
                    "positive": [
                        "Интересная история основания города, прекрасные экскурсии",
                        "Красивые виды на Неву и город с территории крепости",
                        "Хорошее место для семейных прогулок с детьми",
                        "Регулярно проводятся культурные мероприятия и выставки",
                        "Доступная цена за вход на территорию"
                    ],
                    "negative": [
                        "Холодно и ветрено в непогоду из-за расположения на острове",
                        "Платный вход в некоторые объекты на территории",
                        "Не всегда достаточно информационных табличек"
                    ]
                }
            }
        ]
    },
    "Казань": {
        "Автомобили": [
            {
                "name": "Автомузей Ретро Гараж",
                "description": "Коллекция ретро-автомобилей и мотоциклов советской эпохи",
                "prices": {"взрослый": 500, "детский": 300, "экскурсия": 200},
                "working_hours": "10:00-20:00 ежедневно",
                "age_restriction": "6+",
                "rating": 4.5,
                "url": "https://retro-garage.ru",
                "reviews": {
                    "positive": [
                        "Интересное место для автолюбителей и поклонников советской эпохи",
                        "Хорошая коллекция автомобилей в отличном состоянии",
                        "Ностальгия по СССР, много уникальных экспонатов",
                        "Доступные цены на билеты и экскурсии",
                        "Удобное расположение в центре города"
                    ],
                    "negative": [
                        "Небольшой музей, быстро осматривается",
                        "Ограниченное количество экспонатов",
                        "Информационные таблички могли бы быть подробнее"
                    ]
                }
            }
        ],
        "История Родины": [
            {
                "name": "Казанский Кремль",
                "description": "Исторический комплекс под открытым небом, объект Всемирного наследия ЮНЕСКО",
                "prices": {"территория": 0, "музеи": "200-500", "экскурсия": 800},
                "working_hours": "Круглосуточно",
                "age_restriction": "0+",
                "rating": 4.9,
                "url": "https://kazan-kremlin.ru",
                "reviews": {
                    "positive": [
                        "Обязательно к посещению в Казани! Прекрасное историческое место",
                        "Красивая архитектура, гармоничное сочетание культур",
                        "Ухоженная территория, прекрасные виды на город",
                        "Интересные музеи и выставки на территории",
                        "Бесплатный вход на территорию - отлично для бюджетных туристов"
                    ],
                    "negative": [
                        "Много туристов в сезон, может быть тесно",
                        "Платный вход в некоторые музеи и объекты",
                        "Не все объекты доступны для людей с ограниченными возможностями"
                    ]
                }
            }
        ],
        "Искусство и культура": [
            {
                "name": "Татарский академический театр им. Г. Камала",
                "description": "Старейший татарский драматический театр с богатыми традициями",
                "prices": {"взрослый": 500, "льготный": 300, "студенческий": 250},
                "working_hours": "10:00-19:00, кассы; спектакли в 18:30",
                "age_restriction": "12+",
                "rating": 4.7,
                "url": "https://kamalteatr.ru",
                "reviews": {
                    "positive": [
                        "Прекрасные постановки на татарском языке с синхронным переводом",
                        "Атмосферный исторический зал с отличной акустикой",
                        "Талантливые актеры и режиссеры",
                        "Интересный репертуар, сочетающий классику и современность",
                        "Удобное расположение в центре города"
                    ],
                    "negative": [
                        "Не все спектакли идут с синхронным переводом",
                        "Иногда сложно достать билеты на популярные постановки",
                        "Немного тесноваты ряды в зале"
                    ]
                }
            },
            {
                "name": "Национальный музей Республики Татарстан",
                "description": "Крупнейший региональный музей с богатой коллекцией искусства и истории",
                "prices": {"взрослый": 300, "льготный": 150, "дети до 16 лет": 0},
                "working_hours": "10:00-18:00, понедельник - выходной",
                "age_restriction": "0+",
                "rating": 4.6,
                "url": "https://tatmuseum.ru",
                "reviews": {
                    "positive": [
                        "Богатая коллекция татарского искусства и народных промыслов",
                        "Интересные временные выставки современных художников",
                        "Профессиональные экскурсоводы",
                        "Удобное расположение в историческом здании",
                        "Доступные цены на билеты"
                    ],
                    "negative": [
                        "Некоторые залы требуют современного оборудования",
                        "Не всегда есть подробные описания на английском языке",
                        "Очереди в кассы в выходные дни"
                    ]
                }
            }
        ]
    },
    "Тюмень": {
        "Походы и прогулки": [
            {
                "name": "Набережная реки Туры",
                "description": "Живописная набережная для прогулок с мостами и смотровыми площадками",
                "prices": {"бесплатно": 0},
                "working_hours": "Круглосуточно",
                "age_restriction": "0+",
                "rating": 4.6,
                "url": "https://www.tyumen-city.ru/places/attractions/naberezhnaya",
                "reviews": {
                    "positive": [
                        "Красивое место для вечерних прогулок и отдыха",
                        "Отличная благоустроенная прогулочная зона",
                        "Хорошее освещение вечером, безопасно гулять",
                        "Прекрасные виды на реку и город",
                        "Много скамеек и мест для отдыха"
                    ],
                    "negative": [
                        "Может быть ветрено у реки в холодную погоду",
                        "Мало скамеек в некоторых участках набережной",
                        "В выходные может быть многолюдно"
                    ]
                }
            }
        ]
    },
    "Екатеринбург": {
        "История Родины": [
            {
                "name": "Храм на Крови",
                "description": "Православный храм-памятник на месте расстрела царской семьи",
                "prices": {"бесплатно": 0, "экскурсия": 400},
                "working_hours": "07:00-23:00 ежедневно",
                "age_restriction": "0+",
                "rating": 4.8,
                "url": "https://hram-na-krovi.ur.ru",
                "reviews": {
                    "positive": [
                        "Сильное место, важная страница истории России",
                        "Красивая архитектура, ухоженная территория",
                        "Духовно значимое место для православных верующих",
                        "Интересные и познавательные экскурсии",
                        "Приветливый персонал"
                    ],
                    "negative": [
                        "Эмоционально тяжелое место для некоторых посетителей",
                        "Много паломников в религиозные праздники",
                        "Ограничения на фотосъемку в некоторых зонах"
                    ]
                }
            }
        ]
    }
};

// Описания городов
const CITY_DESCRIPTIONS = {
    "Москва": "Столица России с богатейшим выбором развлечений на любой вкус",
    "Санкт-Петербург": "Культурная столица с великолепной архитектурой и музеями",
    "Казань": "Город с уникальным сочетанием восточной и европейской культур",
    "Тюмень": "Старейший сибирский город с современными развлечениями",
    "Екатеринбург": "Столица Урала с богатой историей и культурой"
};

// Иконки для категорий
const CATEGORY_ICONS = {
    "Автомобили": "🚗",
    "История Родины": "🏛️",
    "Спорт": "⚽",
    "Искусство и культура": "🎭",
    "Походы и прогулки": "🚶"
};

// Контент главной страницы
const homeContent = `
  <h1>Добро пожаловать на сайт LEISURE & FUN!</h1>
  <p>Погрузитесь в мир развлечений и отдыха!</p>
  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
       alt="Горячие развлечения и отдых" />
`

// Контент каталога (города)
const catalogContent = `
  <h1>Каталог развлечений по городам</h1>
  <p>Выберите город, чтобы увидеть доступные развлечения!</p>
  <div class="cities-grid" id="cities-grid">
    ${generateCitiesGrid()}
  </div>
`

// Контент поддержки
const supportContent = `
  <h1>Горячая линия поддержки</h1>
  <p>Мы горим желанием помочь вам! Свяжитесь с нами любым удобным способом:</p>
  <ul class="support-list">
    <li>
      <span aria-hidden="true">Наша почта 📧</span>
      Email:
      <button class="copy-btn" data-text="leisurefun8@gmail.com" aria-label="Скопировать адрес электронной почты">
        <a href="mailto:leisurefun8@gmail.com">leisurefun8@gmail.com</a>
      </button>
    </li>
    <li>
      <span aria-hidden="true">Телефон для связи 📱</span>
      Телефон:
      <button class="copy-btn" data-text="+79292622479" aria-label="Скопировать номер телефона">
        <a href="tel:+79292622479">+7 (929) 262-24-79</a>
      </button>
    </li>
  </ul>
`

// Функция для генерации сетки городов
function generateCitiesGrid() {
    return Object.keys(ENTERTAINMENT_DB).map(city => `
        <div class="city-card" data-city="${city}">
            <div class="city-header">
                <span class="city-icon">🏙️</span>
                <div>
                    <div class="city-title">${city}</div>
                    <div class="city-description">${CITY_DESCRIPTIONS[city]}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Функция для генерации контента категорий города
function generateCityContent(city) {
    const categories = ENTERTAINMENT_DB[city];
    return `
        <button class="back-button" onclick="setActiveSection('catalog')">← Назад к городам</button>
        <h1>Развлечения в ${city}</h1>
        <p>Выберите категорию развлечений</p>
        <div class="categories-list open" id="categories-list">
            ${Object.keys(categories).map(category => `
                <div class="category-item" data-category="${category}">
                    <div class="category-header">
                        <span class="category-icon">${CATEGORY_ICONS[category] || '🎯'}</span>
                        ${category}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Функция для генерации контента мест развлечений
function generateCategoryContent(city, category) {
    const places = ENTERTAINMENT_DB[city][category];
    return `
        <button class="back-button" onclick="showCityContent('${city}')">← Назад к категориям</button>
        <h1>${category} в ${city}</h1>
        <p>Доступные места для посещения</p>
        <div class="places-list open" id="places-list">
            ${places.map(place => `
                <div class="place-item">
                    <div class="place-header">
                        <div class="place-name">${place.name}</div>
                        <div class="place-rating">${place.rating}/5</div>
                    </div>
                    <div class="place-description">${place.description}</div>
                    <div class="place-details">
                        <div class="detail-item">
                            <span class="detail-icon">🕒</span>
                            ${place.working_hours}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">👥</span>
                            Возраст: ${place.age_restriction}
                        </div>
                    </div>
                    <div class="place-prices">
                        <div class="price-title">Цены:</div>
                        <div class="price-items">
                            ${Object.entries(place.prices).map(([type, price]) => `
                                <div class="price-item">
                                    ${type}: ${price === 0 ? 'бесплатно' : (typeof price === 'number' ? price + ' руб.' : price)}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="place-reviews">
                        <div class="review-section">
                            <div class="review-title positive">Положительные отзывы</div>
                            <ul class="review-list">
                                ${place.reviews.positive.map(review => `<li class="review-item">${review}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="review-section">
                            <div class="review-title negative">Отрицательные отзывы</div>
                            <ul class="review-list">
                                ${place.reviews.negative.map(review => `<li class="review-item">${review}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <a href="${place.url}" target="_blank" class="place-link">Перейти на сайт</a>
                </div>
            `).join('')}
        </div>
    `;
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';

  // Анимация появления
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);

  // Автоматическое скрытие через 3 секунды
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 300);
  }, 3000);
}

// Функция для копирования текста в буфер обмена
async function copyToClipboard(text, element) {
  try {
    await navigator.clipboard.writeText(text);

    // Визуальная обратная связь
    element.parentElement.classList.add('copied');
    setTimeout(() => {
      element.parentElement.classList.remove('copied');
    }, 2000);

    showNotification(`Скопировано: ${text}`, 'success');
    return true;
  } catch (err) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        element.parentElement.classList.add('copied');
        setTimeout(() => {
          element.parentElement.classList.remove('copied');
        }, 2000);

        showNotification(`Скопировано: ${text}`, 'success');
        return true;
      } else {
        throw new Error('Copy command failed');
      }
    } catch (fallbackErr) {
      console.error('Ошибка копирования:', fallbackErr);
      showNotification('Не удалось скопировать. Скопируйте текст вручную.', 'error');
      return false;
    }
  }
}

// Функция для инициализации кнопок копирования
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-text');
      await copyToClipboard(textToCopy, button);
    });

    button.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const textToCopy = button.getAttribute('data-text');
        await copyToClipboard(textToCopy, button);
      }
    });
  });
}

// Функция переключения активной кнопки меню и обновления содержимого
function setActiveSection(section) {
  // Добавляем анимацию перехода
  content.style.opacity = '0';
  content.style.transform = 'translateY(20px)';

  setTimeout(() => {
    // Обновляем содержимое в зависимости от раздела
    switch(section) {
      case 'home':
        content.innerHTML = homeContent;
        break;
      case 'catalog':
        content.innerHTML = catalogContent;
        attachCatalogListeners();
        break;
      case 'support':
        content.innerHTML = supportContent;
        initCopyButtons();
        break;
    }

    // Обновляем активное состояние кнопок
    document.querySelectorAll('nav button').forEach(btn => {
      const isActive = btn.id === section + "Btn";
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    // Анимация появления контента
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.style.transition = 'all 0.5s ease';

    content.focus();
  }, 200);
}

// Функция для показа контента города
function showCityContent(city) {
  content.style.opacity = '0';
  content.style.transform = 'translateY(20px)';

  setTimeout(() => {
    content.innerHTML = generateCityContent(city);
    attachCityListeners(city);

    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.focus();
  }, 200);
}

// Функция для показа контента категории
function showCategoryContent(city, category) {
  content.style.opacity = '0';
  content.style.transform = 'translateY(20px)';

  setTimeout(() => {
    content.innerHTML = generateCategoryContent(city, category);

    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.focus();
  }, 200);
}

// Навешиваем события на кнопки главного меню
document.getElementById('homeBtn').addEventListener('click', () => setActiveSection('home'));
document.getElementById('catalogBtn').addEventListener('click', () => setActiveSection('catalog'));
document.getElementById('supportBtn').addEventListener('click', () => setActiveSection('support'));

// Функция для обработки кликов по городам
function attachCatalogListeners() {
  const cityCards = document.querySelectorAll('.city-card');

  cityCards.forEach(card => {
    card.addEventListener('click', () => {
      const city = card.getAttribute('data-city');
      showCityContent(city);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const city = card.getAttribute('data-city');
        showCityContent(city);
      }
    });
  });
}

// Функция для обработки кликов по категориям
function attachCityListeners(city) {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      showCategoryContent(city, category);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = item.getAttribute('data-category');
        showCategoryContent(city, category);
      }
    });
  });
}

// При загрузке показываем главную страницу
setActiveSection('home');