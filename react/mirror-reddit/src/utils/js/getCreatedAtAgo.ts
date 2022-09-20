export function getCreatedAtAgo(date: number) {
  let now = +new Date().toLocaleDateString().split('.').reverse().join('');
  let createdAt = +new Date(+(date + '000')).toLocaleDateString().split('.').reverse().join('');
  let text: string[] = ['день', 'дня', 'дней'];

  if (now - createdAt === 0) {
    now = +new Date().toLocaleTimeString().split(':')[0];
    createdAt = +new Date(+(date + '000')).toLocaleTimeString().split(':')[0];
    text = ['час', 'часа', 'часов'];
  }

  if (now - createdAt === 0) {
    now = +new Date().toLocaleTimeString().split(':')[1];
    createdAt = +new Date(+(date + '000')).toLocaleTimeString().split(':')[1];
    text = ['минуту', 'минуты', 'минут'];
  }

  if (now - createdAt === 0) {
    now = +new Date().toLocaleTimeString().split(':')[2];
    createdAt = +new Date(+(date + '000')).toLocaleTimeString().split(':')[2];
    text = ['секунду', 'секунды', 'секунд'];
  }

  const timeAgo = now - createdAt;
  if (+String(timeAgo).slice(-1) === 1) {
    return timeAgo + ' ' + text[0] + ' назад';
  } else if (+String(timeAgo).slice(-1) > 1 && +String(timeAgo).slice(-1) < 5) {
    return timeAgo + ' ' + text[1] + ' назад';
  } else {
    return timeAgo + ' ' + text[2] + ' назад';
  }
}
