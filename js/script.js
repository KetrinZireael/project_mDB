/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту
*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    let img = ['url("../img/bg.jpg")', 'url("../img/mars.webp")'];
    
    
    let adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        list = document.querySelector('.promo__interactive-list'),
        item = list.querySelectorAll('.promo__interactive-item'),
        input = document.querySelector('.adding__input'),
        button = document.querySelector('button'),
        checkbox = document.querySelector('[type="checkbox"]');
    
    button.addEventListener('click', addFilm);
    
    let removeElements = (elements) => {
            elements.forEach(item => {
            item.remove();
        });
    };
    let newText = () => genre.textContent = 'НАУЧНАЯ ФАНТАСТИКА, ДРАМА';
    let newBackgroundImage = () => poster.style.backgroundImage = 'url("../img/bg.jpg")';
    
    let listFilms = () => {
        list.innerHTML = "";
        movieDB.movies.sort();
        movieDB.movies.forEach((film, i) => {
            if(film.length > 21) {
                film.slice(21);
            }
            list.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                listFilms();
            });
        });
    };
    
    function addFilm() {
        let film = input.value;
        let favorite = checkbox.checked;

        if (film) {
            if (film.length > 21) {
                film = `${film.substring(0, 22)}...`;
            }
            movieDB.movies.push(film);
            listFilms();
            input.value = '';
        }
    }

    removeElements(adv);
    newText();
    newBackgroundImage();
    listFilms();
});

