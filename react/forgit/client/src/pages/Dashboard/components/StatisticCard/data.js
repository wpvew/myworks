import React from 'react';
import { generateId } from '../../../../utils/generateRandomIndex';

const statisticCardData = [
  {
    title: 'Готовность к выполнению мобилизационных заданий',
    data: [{ name: 'Всего моб. заданий', value: '3' }],
    complitedOn: 27,
  },
  {
    title: 'Обеспеченность производственными мощностями',
    data: [
      { name: 'Площадь', value: '500 кв.м.' },
      { name: 'Оборудование', value: '30 ед.' },
    ],
    complitedOn: 40,
  },
  {
    title: 'Обеспеченность рабочей силы',
    data: [
      { name: 'Сотрудников', value: '1200 чел.' },
      { name: 'Забранировано', value: '600 чел.' },
    ],
    complitedOn: 90,
  },
]
  .map(generateId)
  .map((item) => ({ ...item, data: item.data.map(generateId) }));

export default statisticCardData;
