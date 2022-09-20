# Фронтенд к итоговой работе «Банк»

## Запуск проекта
1. Бэкенд запускается на с помощью `npm start` на 3000-ом порту localhost.
2. Webpack watch командой `npm run watch` запускается на 4200-ом порту localhost.
3. Билд сборка - `npm run dev`; Дев сборка - `npm run build`

## Запуск тестов
Тесты запускаются из папки frontend
1. Запуск юнит тестов из папки frontend командой `npm test`. Нашлось только 2 функции подходящие для юнит-тестов, остальные возвращают ДОМ.
2. Запуск е2е тестов командой `npm cypress open`. В папка "3-Coin" 2 теста: первый на позитивный сценарий, когда пользователь вводит то, что от него хотят, второй негативный - на обработку некорректный значений ввода.

## Логин и пароль на странице авторизации
* Логин: `developer`
* Пароль: `skillbox`