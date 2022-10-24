import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TForecastWeatherData } from '../../../../hooks/useWeatherData';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../../store/storeRedux';
import { ETypeTemp } from '../../../../store/typeTemperature/action';
import { EViewport } from '../../../../store/viewport/action';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import classnames from 'classnames';
import styles from '../../../../styles/forecast.scss';

interface IForecastProps {
  list: (TForecastWeatherData & Record<'id', string>)[];
}

SwiperCore.use([Pagination, Navigation]);

export function Forecast({ list }: IForecastProps) {
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);

  return (
    <div className={styles.forecast}>
      <Swiper
        spaceBetween={12}
        navigation={viewport === EViewport.desktop}
        // pagination={{ type: 'progressbar' }}
        breakpoints={{
          0: {
            slidesPerView: 5,
          },
          380: {
            slidesPerView: 6,
          },
          430: {
            slidesPerView: 7,
          },
          530: {
            slidesPerView: 8,
          },
          630: {
            slidesPerView: 9,
          },
          730: {
            slidesPerView: 11,
          },
          769: {
            slidesPerView: 7,
            spaceBetween: 15,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 10,
            spaceBetween: 20,
          },
        }}
      >
        {list.map((item) => (
          <SwiperSlide
            className={classnames(styles.hourItem, item.isCurrent ? styles.active : '')}
            key={item.id}
          >
            <span>{item.date}</span>
            <img className={styles.image} src={item.condition_icon} alt={item.condition_name} />
            <div className={styles.temperature}>
              <span>{typeTemp === ETypeTemp.celsius ? item.temp_c : item.temp_f}</span>
              <span className={styles.tempLabel}>°</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
