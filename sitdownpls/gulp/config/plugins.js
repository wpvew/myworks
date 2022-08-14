import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщения (подсказки)
import browsersync from "browser-sync";
import newer from "gulp-newer"; // рповерка обновления картинки
import gulpIf from "gulp-if";
import concat from "gulp-concat";
import rename from 'gulp-rename';

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: gulpIf,
  concat: concat,
  rename: rename
}
