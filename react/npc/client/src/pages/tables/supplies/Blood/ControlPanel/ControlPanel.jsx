import React from 'react';
import UIButton from '../../../../../components/UI/UIButton';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  fetchCreateNewRow,
  fetchRemoveRow,
  fetchSaveSupplyBlood,
  fetchSupplyBlood,
} from '../../../../../store/slices/supplyBloodSlice';

const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const { selectedRowId } = useAppSelector((state) => state.selectedRowReducer);
  const { selectedSubject } = useAppSelector((state) => state.subjectsReducer);

  return (
    <Grid container spacing={{ xs: 1, lg: 3 }}>
      <Grid item pl={0} xs={6} md={3} lg={2}>
        <UIButton onClick={() => dispatch(fetchCreateNewRow())} disabled={!selectedSubject}>
          Добавить
        </UIButton>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <UIButton onClick={() => dispatch(fetchSupplyBlood())} disabled={!selectedSubject}>
          Обновить
        </UIButton>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <UIButton onClick={() => dispatch(fetchRemoveRow())} disabled={!selectedRowId.length}>
          Удалить
        </UIButton>
      </Grid>
      <Grid item xs={6} md={3} lg={2} ml={'auto'}>
        <UIButton onClick={() => dispatch(fetchSaveSupplyBlood())}>Сохранить</UIButton>
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
