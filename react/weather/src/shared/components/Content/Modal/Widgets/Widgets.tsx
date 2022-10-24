import React from 'react';
import { useSelector } from 'react-redux';
import { useWidgets } from '../../../../hooks/useWidgets';
import { TCurrentWeatherData } from '../../../../hooks/useWeatherData';
import { TRootState } from '../../../../store/storeRedux';
import { generateId } from '../../../../utils/generateRandomIndex';
import { Icon } from '../../../Icon';
import styles from '../../../../styles/widgets.scss';

export function Widgets() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const [widgetsList] = useWidgets(currentWeatherData);
  const widgetsListWithKey = widgetsList.map(generateId);

  return (
    <div className={styles.widgets}>
      <h3 className={styles.title}>Today{"'"}s Highlights</h3>
      <ul className={styles.widgetsList}>
        {widgetsListWithKey.map((widget) => {
          return (
            <li className={styles.widgetsItem} data-grid={widget.name} key={widget.id}>
              <div className={styles.header}>
                <Icon name={widget.icon} />
                <span className={styles.name}>{widget.name}</span>
              </div>
              <div className={styles.value}>
                <span>{widget.value}</span>
              </div>
              {widget.map}
              <div className={styles.addInfo}>
                <span>{widget.addParams}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
