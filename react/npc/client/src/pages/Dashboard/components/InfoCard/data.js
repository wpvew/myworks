import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { generateId } from '../../../../utils/generateRandomIndex';

const styleData = () => {
  return { transform: 'translateY(5px)' };
};
const infoCardData = [
  {
    title: 'Схема объектов и картотека организаций',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <AccountTreeIcon sx={styleData()} />,
  },
  {
    title: 'ПДП',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <WidgetsIcon sx={styleData()} />,
  },
  {
    title: 'Реестр НПА',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <ArticleIcon sx={styleData()} />,
  },
  {
    title: 'Картотека граждан',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <AssignmentIndIcon sx={styleData()} />,
  },
  {
    title: 'Отчет по бронированию',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <BusinessCenterIcon sx={styleData()} />,
  },
  {
    title: 'Моб. план',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis temporibus porro eum animi, sed odit totam ratione rem sequi corrupti excepturi placeat eius inventore ut enim nihil deserunt id.',
    icon: <CalendarMonthIcon sx={styleData()} />,
  },
].map(generateId);

export default infoCardData;
