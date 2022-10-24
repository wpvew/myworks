import React, { useEffect, useState } from 'react';
import { useLocationWeatherData } from '../../hooks/useLocationWeatherData';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/storeRedux';
import { ETypeTemp, updateTypeTemperature } from '../../store/typeTemperature/action';
import { ServiceBlock } from '../../components/ServiceBlock';
import { Container } from '../../components/Container';
import { SearchLocation } from '../../components/SearchLocation';
import { LocationList } from '../../components/LocationList';
import styles from '../../styles/locations.scss';

export type TDropdownList = {
  id: string;
  location: string;
};

export function Locations() {
  const [locations, setLocations] = useState([localStorage.location]);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const dispatch = useDispatch();
  const {
    data: { locationsData },
    error,
    loader,
  } = useLocationWeatherData(locations);

  useEffect(() => {
    if (localStorage.locationList) {
      setLocations([
        ...locations,
        ...JSON.parse(localStorage.locationList).filter(
          (item: string) => item !== localStorage.location
        ),
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locationList', JSON.stringify(locations));
  }, [locations]);

  const handleAddLocation = (value: string) => {
    if (!locations.find((local) => local === value)) setLocations([...locations, value]);
    setIsSearchOpened(false);
  };

  const handleSwitchSearch = () => {
    setIsSearchOpened(!isSearchOpened);
  };

  const handleDelete = (value: string) => {
    setLocations(locations.filter((local) => local !== value));
  };

  const handleSwitchTypeTemp = () => {
    dispatch(
      updateTypeTemperature(
        typeTemp === ETypeTemp.celsius ? ETypeTemp.fahrenheit : ETypeTemp.celsius
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('typeTemp', typeTemp);
  }, [typeTemp]);

  return (
    <main>
      {error && <ServiceBlock error={error} />}
      {loader && <ServiceBlock />}
      {!loader && !error && (
        <Container>
          <div className={styles.container}>
            <LocationList list={locationsData} onDelete={handleDelete} />

            {!isSearchOpened && (
              <div className={styles.btns}>
                <button className={styles.typeTemp} onClick={handleSwitchTypeTemp}>
                  <span className={typeTemp === ETypeTemp.celsius ? styles.active : ''}>°С</span> /{' '}
                  <span className={typeTemp === ETypeTemp.fahrenheit ? styles.active : ''}>°F</span>
                </button>
                <button className={styles.additionBtn} onClick={handleSwitchSearch}>
                  <span></span>
                </button>
              </div>
            )}

            {isSearchOpened && (
              <SearchLocation onChoice={handleAddLocation} onClose={handleSwitchSearch} />
            )}
          </div>
        </Container>
      )}
    </main>
  );
}
