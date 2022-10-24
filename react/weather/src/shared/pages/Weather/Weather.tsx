import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { Content } from '../../components/Content';
import { Header } from '../../components/Header';
import { ServiceBlock } from '../../components/ServiceBlock';
import { useWeatherData } from '../../hooks/useWeatherData';

export function Weather() {
  const params = useParams() as { location: string };
  const { error, loader } = useWeatherData(params.location);
  return (
    <Container>
      {!loader && !error && (
        <>
          <Header />
          <Content />
        </>
      )}
      {error && <ServiceBlock error={error} />}
      {loader && <ServiceBlock />}
    </Container>
  );
}
