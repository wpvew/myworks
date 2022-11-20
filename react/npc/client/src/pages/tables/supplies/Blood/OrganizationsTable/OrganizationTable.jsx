import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs } from './config/data';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { updateSelectedRow } from '../../../../../store/slices/selectedRowSlice';
import { updateRow } from '../../../../../store/slices/supplyBloodSlice';
import './organizationtable.css';

const OrganizationTable = () => {
  const tableStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const { supplyBlood, error, loading } = useAppSelector((state) => state.supplyBloodReducer);
  const [overlayNoRowsTemplate, setOverlayNoRowsTemplate] = useState('Субъект не выбран или записи отсутствуют');

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      valueSetter: (params) => {
        const changedRow = { ...params.data, [params.colDef.field]: params.newValue };
        dispatch(updateRow(changedRow));
      },
    };
  }, []);

  useEffect(() => {
    if (gridApi) {
      if (loading && !error.message) gridApi.showLoadingOverlay();
      if (error.message && !loading) {
        gridApi.hideOverlay();
        setOverlayNoRowsTemplate(error.message);
      }
      if (!loading && !error.message && supplyBlood.length) gridApi.hideOverlay();
      if (!loading && !error.message && !supplyBlood.length) {
        setRowData([]);
        gridApi.showNoRowsOverlay();
      }
    }
    return () => {
      dispatch(updateSelectedRow(''));
      if (gridApi)
        gridApi.forEachNode((node) => {
          node.setSelected('');
        });
    };
  }, [loading]);

  useEffect(() => {
    setRowData(supplyBlood);
  }, [supplyBlood]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onRowClicked = (params) => {
    dispatch(updateSelectedRow(gridApi.getSelectedRows().map((row) => row.id)));
  };

  return (
    <div style={tableStyle} className='ag-theme-alpine'>
      <AgGridReact
        groupHeaderHeight={70}
        rowData={rowData}
        columnDefs={columnDefs}
        rowHeight={42}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={'multiple'}
        rowMultiSelectWithClick={true}
        onRowClicked={onRowClicked}
        overlayNoRowsTemplate={overlayNoRowsTemplate}
      />
    </div>
  );
};

export default OrganizationTable;
