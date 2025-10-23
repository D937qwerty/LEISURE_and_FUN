// Получаем корневой элемент для приложения
const app = document.getElementById('app')

// Создаём базовую структуру навигации и основного контента
app.innerHTML = `
  <nav aria-label="Основное меню сайта LEISURE & FUN">
    <button id="homeBtn" class="active" aria-controls="content" aria-selected="true" role="tab">
      <span class="icon" aria-hidden="true">🏠</span> Главная
    </button>
    <button id="catalogBtn" aria-controls="content" aria-selected="false" role="tab">
      <span class="icon" aria-hidden="true">🛍️</span> Каталог услуг
    </button>
    <button id="supportBtn" aria-controls="content" aria-selected="false" role="tab">
      <span class="icon" aria-hidden="true">📞</span> Поддержка
    </button>
  </nav>
  <main id="content" role="tabpanel" tabindex="0" aria-live="polite"></main>
`

const content = document.getElementById('content')

// Контент главной страницы с другой картинкой для актуальности
const homeContent = `
  <h1>Добро пожаловать в LEISURE & FUN!</h1>
  <p>Отдыхайте, развлекайтесь и наслаждайтесь жизнью вместе с нами.</p>
  <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80" 
       alt="Отдых и развлечения" style="width:100%; max-width:700px; border-radius:16px; margin-top:20px; box-shadow:0 8px 20px rgba(255,113,91,0.3);" />
`

// Контент каталога с раскрывающимся выпадающим списком подкатегорий
const catalogContent = `
  <h1>Каталог услуг</h1>
  <ul class="catalog-list" aria-label="Каталог услуг">
    <li id="cat1" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist1">
      <span class="arrow" aria-hidden="true">▶️</span> Кино и концерты
      <ul id="sublist1" class="catalog-sublist" role="region" aria-hidden="true">
        <li>Киносеансы</li>
        <li>Концертные шоу</li>
        <li>Фестивали</li>
      </ul>
    </li>
    <li id="cat2" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist2">
      <span class="arrow" aria-hidden="true">▶️</span> Активный отдых
      <ul id="sublist2" class="catalog-sublist" role="region" aria-hidden="true">
        <li>Велотуры</li>
        <li>Пешие походы</li>
        <li>Водные виды спорта</li>
      </ul>
    </li>
    <li id="cat3" tabindex="0" role="button" aria-expanded="false" aria-controls="sublist3">
      <span class="arrow" aria-hidden="true">▶️</span> Творческие мастер-классы
      <ul id="sublist3" class="catalog-sublist" role="region" aria-hidden="true">
        <li>Рисование</li>
        <li>Керамика</li>
        <li>Фотография</li>
      </ul>
    </li>
  </ul>
`

// Контент поддержки с контактной информацией
const supportContent = `
  <h1>Поддержка пользователей</h1>
  <p>Если у вас возникли вопросы, пишите или звоните нам:</p>
  <ul class="support-list">
    <li><span aria-hidden="true">✉️</span> Email: <a href="mailto:support@leisurefun.com">support@leisurefun.com</a></li>
    <li><span aria-hidden="true">📱</span> Телефон: <a href="tel:+79292622479">+79292622479</a></li>
    <li><span aria-hidden="true">💬</span> Онлайн-чат: с 9:00 до 21:00 по МСК</li>
  </ul>
`

// Функция переключения активной кнопки меню и обновления содержимого
function setActiveSection(section) {
    // Обновляем содержимое в зависимости от раздела
    switch (section) {
        case 'home':
            content.innerHTML = homeContent
            break
        case 'catalog':
            content.innerHTML = catalogContent
            attachCatalogListeners() // чтобы раскрывать подменю
            break
        case 'support':
            content.innerHTML = supportContent
            break
    }

    // Обновляем активное состояние кнопок
    document.querySelectorAll('nav button').forEach(btn => {
        const isActive = btn.id === section + "Btn"
        btn.classList.toggle('active', isActive)
        btn.setAttribute('aria-selected', isActive)
    })
    content.focus()
}

// Навешиваем события на кнопки главного меню
document.getElementById('homeBtn').addEventListener('click', () => setActiveSection('home'))
document.getElementById('catalogBtn').addEventListener('click', () => setActiveSection('catalog'))
document.getElementById('supportBtn').addEventListener('click', () => setActiveSection('support'))

// При загрузке показываем главную страницу
setActiveSection('home')

// Функция для раскрытия/скрытия подменю каталога
function attachCatalogListeners() {
    const catalogItems = document.querySelectorAll('.catalog-list > li')
    catalogItems.forEach(item => {
        const arrow = item.querySelector('.arrow')
        const sublist = item.querySelector('.catalog-sublist')
        item.setAttribute('aria-expanded', 'false')
        sublist.setAttribute('aria-hidden', 'true')

        function toggleSublist() {
            const expanded = item.getAttribute('aria-expanded') === 'true'
            if (expanded) {
                item.setAttrib
                ute('aria-expanded', 'false')
                item.classList.remove('expanded')
                arrow.textContent = '▶️'
                sublist.classList.remove('open')
                sublist.setAttribute('aria-hidden', 'true')
            } else {
                item.setAttribute('aria-expanded', 'true')
                item.classList.add('expanded')
                arrow.textContent = '🔽'
                sublist.classList.add('open')
                sublist.setAttribute('aria-hidden', 'false')
            }
        }

        // Клик по элементу списка
        item.addEventListener('click', toggleSublist)
        // Клавиши Enter и Space для доступности
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleSublist()
            }
        })
    })
}

