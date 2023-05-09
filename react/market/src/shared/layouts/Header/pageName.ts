export const pageName = (str: string) => {
  switch (str) {
    case 'dashboard': {
      return 'Управление';
    }
    case 'employeers': {
      return 'Cотрудники';
    }
    case 'products': {
      return 'Товар';
    }
    case 'warehouse': {
      return 'Склад';
    }
    default: {
      return '';
    }
  }
};
