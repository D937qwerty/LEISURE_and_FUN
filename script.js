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

// Контент главной страницы
const homeContent = `
  <h1>Добро пожаловать на сайт LEISURE & FUN!</h1>
  <p>Погрузитесь в мир развлечений и отдыха!</p>
  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
       alt="Горячие развлечения и отдых" />
`

// Контент каталога
const catalogContent = `
  <h1>Категории развлечений</h1>
  <p>Выберите категорию и зажгите своё настроение!</p>
  <ul class="catalog-list" aria-label="Каталог услуг">
    <li class="catalog-item" id="cat1" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist1">
      <div class="catalog-header">
        <span class="arrow" aria-hidden="true">🎬</span>
        <span class="catalog-title">Кино, выставки и концерты</span>
      </div>
      <ul id="sublist1" class="catalog-sublist" role="region" aria-hidden="true">
        <li class="subcategory-item">🎥 Киносеансы</li>
        <li class="subcategory-item">🎤 Концертные шоу</li>
        <li class="subcategory-item">🎪 Фестивали</li>
      </ul>
    </li>
    <li class="catalog-item" id="cat2" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist2">
      <div class="catalog-header">
        <span class="arrow" aria-hidden="true">🚴</span>
        <span class="catalog-title">Активный отдых</span>
      </div>
      <ul id="sublist2" class="catalog-sublist" role="region" aria-hidden="true">
        <li class="subcategory-item">🚴‍♂️ Велотуры</li>
        <li class="subcategory-item">🥾 Пешие походы</li>
        <li class="subcategory-item">🏄‍♂️ Водные виды спорта</li>
      </ul>
    </li>
    <li class="catalog-item" id="cat3" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist3">
      <div class="catalog-header">
        <span class="arrow" aria-hidden="true">🎨</span>
        <span class="catalog-title">Творческие мастер-классы</span>
      </div>
      <ul id="sublist3" class="catalog-sublist" role="region" aria-hidden="true">
        <li class="subcategory-item">🖌️ Рисование</li>
        <li class="subcategory-item">🏺 Керамика</li>
        <li class="subcategory-item">📸 Фотография</li>
      </ul>
    </li>
  </ul>
`

// Контент поддержки (убраны подсказка и онлайн-чат)
const supportContent = `
  <h1>Горячая линия поддержки</h1>
  <p>Мы горим желанием помочь вам! Свяжитесь с нами любым удобным способом:</p>
  <ul class="support-list">
    <li>
      <span aria-hidden="true">📧</span>
      Email:
      <button class="copy-btn" data-text="daniilnizamov72@gmail.com" aria-label="Скопировать адрес электронной почты">
        <a href="mailto:daniilnizamov72@gmail.com">daniilnizamov72@gmail.com</a>
      </button>
    </li>
    <li>
      <span aria-hidden="true">📱</span>
      Телефон:
      <button class="copy-btn" data-text="+79292622479" aria-label="Скопировать номер телефона">
        <a href="tel:+79292622479">+7 (929) 262-24-79</a>
      </button>
    </li>
  </ul>
`

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
    // Пытаемся использовать современный API
    await navigator.clipboard.writeText(text);

    // Визуальная обратная связь
    element.parentElement.classList.add('copied');
    setTimeout(() => {
      element.parentElement.classList.remove('copied');
    }, 2000);

    showNotification(`Скопировано: ${text}`, 'success');
    return true;
  } catch (err) {
    // Fallback для старых браузеров
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

    // Добавляем обработчик для клавиатуры
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
        initCopyButtons(); // Инициализируем кнопки копирования
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

// Навешиваем события на кнопки главного меню
document.getElementById('homeBtn').addEventListener('click', () => setActiveSection('home'));
document.getElementById('catalogBtn').addEventListener('click', () => setActiveSection('catalog'));
document.getElementById('supportBtn').addEventListener('click', () => setActiveSection('support'));

// При загрузке показываем главную страницу
setActiveSection('home');

// Функция для раскрытия/скрытия подменю каталога
function attachCatalogListeners() {
  const catalogItems = document.querySelectorAll('.catalog-item');

  catalogItems.forEach(item => {
    const header = item.querySelector('.catalog-header');
    const arrow = header.querySelector('.arrow');
    const sublist = item.querySelector('.catalog-sublist');
    const subcategoryItems = item.querySelectorAll('.subcategory-item');

    // Инициализация состояния
    item.setAttribute('aria-expanded', 'false');
    sublist.setAttribute('aria-hidden', 'true');
    sublist.style.display = 'none';

    // Функция переключения подменю
    function toggleSublist() {
      const isExpanded = item.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Закрываем подменю с анимацией
        item.setAttribute('aria-expanded', 'false');
        item.classList.remove('expanded');
        arrow.style.transform = 'rotate(0deg)';
        sublist.classList.remove('open');
        sublist.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          sublist.style.display = 'none';
        }, 400);
      } else {
        // Открываем подменю с анимацией
        item.setAttribute('aria-expanded', 'true');
        item.classList.add('expanded');
        arrow.style.transform = 'rotate(90deg)';
        sublist.style.display = 'block';
        setTimeout(() => {
          sublist.classList.add('open');
          sublist.setAttribute('aria-hidden', 'false');
        }, 10);
      }
    }

    // Клик только по заголовку категории
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSublist();
    });

    // Клавиши Enter и Space для доступности
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSublist();
      }
    });

    // Обработчики для подкатегорий
    subcategoryItems.forEach(subItem => {
      subItem.addEventListener('click', (e) => {
        e.stopPropagation();
        // Эффект выбора подкатегории с красной темой
        subItem.style.background = 'linear-gradient(45deg, rgba(255, 69, 0, 0.2), rgba(255, 140, 0, 0.2))';
        subItem.style.color = '#ff0000';
        setTimeout(() => {
          subItem.style.background = 'transparent';
          subItem.style.color = '#8b0000';
        }, 300);

        console.log('Выбрана подкатегория:', subItem.textContent);
        alert(`Горячее предложение! Вы выбрали: ${subItem.textContent.trim()}`);
      });

      subItem.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          console.log('Выбрана подкатегория:', subItem.textContent);
          alert(`Горячее предложение! Вы выбрали: ${subItem.textContent.trim()}`);
        }
      });
    });

    // Клик по самому элементу списка
    item.addEventListener('click', (e) => {
      if (!e.target.closest('.catalog-header') && !e.target.closest('.subcategory-item')) {
        toggleSublist();
      }
    });
  });
}