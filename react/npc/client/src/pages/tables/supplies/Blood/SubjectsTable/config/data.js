import UITooltip from '../../../../../../components/UI/UITooltip/UITooltip';

export const columnDefs = [
  {
    colId: 'subject',
    field: 'subject',
    headerName: 'Субъект РФ',
    width: 220,
    autoHeight: true,
    cellClass: 'subjects-table__row',
    headerClass: 'subjects-table__header',
    floatingFilter: true,
    filter: true,
    tooltipField: 'subject',
    tooltipComponent: UITooltip,
  },
];
