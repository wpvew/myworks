import User from "./User.js"
import bcrypt from 'bcrypt'
import { ApiError } from "../index.js";

class UserServise {
  async register(data) {
    return makeUserFromData(data).then(data => User(data).save())
  }
  async login(data) {
    const user = await User.findOne({username: data.username});
    if (!!user) return bcrypt.compare(data.password, user.password).then(result => {
      if (result) {
        return user;
      } else {
        throw new ApiError(422, 'Incorrect password');
      }
    })
    throw new ApiError(422, 'No such user');
  }
}

export default new UserServise()



async function makeUserFromData(data) {
  const errors = [];

  function asString(v) {
    return (v && String(v).trim()) || '';
  }

  // составляем объект, где есть только необходимые поля
  const user = {
    username: asString(data.username),
    password: '',
  };

  // хешируем пароль
  if(data.password) {
    await bcrypt.hash(data.password, 10).then(hash => {user.password = hash})
  }

  // проверяем, все ли данные корректные и заполняем объект ошибок, которые нужно отдать клиенту
  const isFree = !(await User.findOne({username: data.username}))
  if (!isFree) errors.push({ field: 'login', message: 'Пользователь с таким именем уже существует' });
  if (!user.username) errors.push({ field: 'login', message: 'Не указано логин' });
  if (!user.password) errors.push({ field: 'password', message: 'Не указана пароль' });

  // если есть ошибки, то бросаем объект ошибки с их списком и 422 статусом
  if (errors.length) throw new ApiError(422, { errors });

  return user;
}
