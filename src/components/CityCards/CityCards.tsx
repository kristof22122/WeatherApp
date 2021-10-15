import React from 'react';
import { CityCard } from '../CityCard/CityCard';
import './CityCards.scss';

type Props = {
  cities: (WeatherFromAPI)[];
  language: string;
  removeItem: (city: WeatherFromAPI) => void;
};

export const CityCards: React.FC<Props> = (props) => {
  const {
    cities,
    language,
    removeItem,
  } = props;

  return (
    <div className="Cards">
      {cities.map((city: WeatherFromAPI) => (
        <div
          key={city.id}
          className="Cards__item"
        >
          <CityCard
            city={city}
            language={language}
            removeItem={removeItem}
          />
        </div>
      ))}
    </div>
  );
};
