import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { fetchSupplyBlood } from '../../../../../store/slices/supplyBloodSlice';
import { updateSelectedRow } from '../../../../../store/slices/selectedRowSlice';
import { useNavigate } from 'react-router-dom';
import { columnDefs } from './config/data';
import { fetchSubjects } from '../../../../../store/slices/subjectsSlice';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './subjectstable.css';

function SubjectsTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState([{ id: '', subject: '' }]);
  const [gridApi, setGridApi] = useState(null);
  const [overlayNoRowsTemplate, setOverlayNoRowsTemplate] = useState('Субъекты не найдены');
  const { subjects, selectedSubject, loading, error } = useAppSelector((state) => state.subjectsReducer);
  const gridStyle = useMemo(() => ({ height: '100%', width: '220px' }), []);

  useEffect(() => {
    if (gridApi) {
      if (loading && !error.message) gridApi.showLoadingOverlay();
      if (error.message && !loading) {
        gridApi.hideOverlay();
        setOverlayNoRowsTemplate(error.message);
      }
      if (!loading && !error.message && subjects.length) {
        gridApi.hideOverlay();
        setTimeout(() => {
          gridApi.forEachNode((node) => {
            node.setSelected(node.data.id === selectedSubject);
          });
        }, 0);
      }
      if (!loading && !error.message && !subjects.length) {
        setRowData([]);
        gridApi.showNoRowsOverlay();
        setOverlayNoRowsTemplate('Субъекты не найдены');
      }
    }
  }, [loading, gridApi]);

  useEffect(() => {
    setRowData(subjects);
  }, [subjects]);

  const onGridReady = (params) => {
    dispatch(fetchSubjects());
    setGridApi(params.api);
  };

  const onCellClicked = (params) => {
    dispatch(updateSelectedRow([]));
    dispatch(fetchSupplyBlood(params.data.id));
    navigate(`${params.data.id}`);
  };

  return (
    <div className='subjects-table'>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          rowHeight={25}
          suppressAndOrCondition={true}
          onCellClicked={onCellClicked}
          rowSelection={'single'}
          maxBlocksInCache={10}
          overlayNoRowsTemplate={overlayNoRowsTemplate}
        />
      </div>
    </div>
  );
}

export default SubjectsTable;
