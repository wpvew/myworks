import React, { useEffect } from 'react';
import pageHeader from './data';
import Layout from '../../../../components/Layout/Layout';
import ServiceBox from '../../../../components/ServiceBox/ServiceBox';
import ErrorBox from '../../../../components/ErrorBox/ErrorBox';
import ControlPanel from './ControlPanel/ControlPanel';
import SubjectsTable from './SubjectsTable/SubjectsTable';
import OrganizationTable from './OrganizationsTable/OrganizationTable';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useParams } from 'react-router-dom';
import { clearSupplyBlood, fetchSupplyBlood } from '../../../../store/slices/supplyBloodSlice';
import { updateSelectedSubject } from '../../../../store/slices/subjectsSlice';

const Blood = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.supplyBloodReducer.error);
  const params = useParams();

  useEffect(() => {
    if (params.id) dispatch(fetchSupplyBlood(params.id));

    return () => {
      dispatch(updateSelectedSubject(''));
      dispatch(clearSupplyBlood());
    };
  }, []);

  return (
    <Layout>
      <Grid container spacing={0} padding={'10px'} height={1} flexWrap={'nowrap'} direction={'column'}>
        <Grid item mb={'10px'} padding={'10px 20px'} bgcolor={'#b6ceff'} border={'1px solid #1800de'}>
          <ServiceBox title={pageHeader.title} description={pageHeader.desc} />
        </Grid>
        {!!error.message.length && (
          <Grid item xs={1} mb={'10px'} padding={'5px 20px'} bgcolor={'#f7a8a8'} border={'1px solid #ff0000'}>
            <ErrorBox />
          </Grid>
        )}

        <Grid container item maxHeight={'1200px'} xs={12} flexWrap={'nowrap'}>
          <Grid item mr={5}>
            <SubjectsTable />
          </Grid>
          <Grid item container xs={12} py={0} pl={0} flexWrap={'nowrap'} direction={'column'}>
            <Grid
              item
              container
              xs={1}
              py={2}
              px={3}
              mb={1}
              alignSelf={'auto'}
              alignItems={'center'}
              bgcolor={'#f8f8f8'}
              border={'1px solid #babfc7'}
            >
              <ControlPanel />
            </Grid>
            <Grid xs={12} item>
              <OrganizationTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Blood;
