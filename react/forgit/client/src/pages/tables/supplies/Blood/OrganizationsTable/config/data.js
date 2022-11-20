export const columnDefs = [
  {
    headerName: 'Организация-исполнитель',
    children: [
      {
        field: 'naim_org',
        headerName: 'Наименование',
        minWidth: 200,
        flex: 2,
        editable: true,
      },
      {
        field: 'adr_fact',
        headerName: 'Местонахождение',
        minWidth: 200,
        flex: 2,
        editable: true,
      },
      {
        field: 'inn',
        headerName: 'ИНН',
        minWidth: 100,
        flex: 1,
        editable: true,
      },
    ],
  },
  ...[
    {
      headerName: 'Плазма свежезамороженная',
      children: [
        {
          field: 'plazma_max',
          headerName: 'Макс. объем (тыс. литров)',
        },
        {
          field: 'plazma_cena',
          headerName: 'Цена (тыс. руб. за литр)',
        },
      ],
    },
    {
      headerName: 'Эритроцитная масса',
      children: [
        {
          field: 'erm_max',
          headerName: 'Макс. объем (тыс. литров)',
        },
        {
          field: 'erm_cena',
          headerName: 'Цена (тыс. руб. за литр)',
        },
      ],
    },
    {
      headerName: 'Иммуноглобулин человека',
      children: [
        {
          field: 'immg_max',
          headerName: 'Макс. объем (тыс. литров)',
        },
        {
          field: 'immg_cena',
          headerName: 'Цена (тыс. руб. за литр)',
        },
      ],
    },
    {
      headerName: 'Альбумин 10-процентный',
      children: [
        {
          field: 'alb_max',
          headerName: 'Макс. объем (тыс. литров)',
        },
        {
          field: 'alb_cena',
          headerName: 'Цена (тыс. руб. за литр)',
        },
      ],
    },
  ].map((item) => ({
    ...item,
    children: item.children.map((childrenItem) => ({
      ...childrenItem,
      minWidth: 120,
      fontSize: '22px',
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      valueGetter: (params) => {
        const parsedValue = parseFloat(params.data[params.colDef.field]);
        if ((parsedValue + '').indexOf('.') === -1) return String(parsedValue.toFixed(2));
        return String(parsedValue);
      },
      valueParser: (params) => {
        const parsedValue = String(parseFloat(+params.newValue.replace(',', '.')));
        const result = isNaN(Number(parsedValue)) ? params.oldValue : parsedValue;
        return result;
      },
    })),
  })),
];
