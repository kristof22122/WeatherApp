import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CityCards } from './components/CityCards/CityCards';
import './App.scss';

import { request } from './api/api';

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [cities, setCities] = useState<(WeatherFromAPI)[]>([]);
  const [language, setLanguage] = useState<string>('en');
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(null);
  };

  const selectedLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const addCard = async () => {
    let errorMessage = '';

    switch (language) {
      case 'en':
        errorMessage = 'City is not found';
        break;

      case 'ru':
        errorMessage = 'Город не найден';
        break;

      case 'ua':
        errorMessage = 'Місто не знайдено';
        break;

      default:
        break;
    }

    const loadedCity = await request(value, language);

    if (loadedCity.cod === '400' || loadedCity.cod === '404') {
      setError(errorMessage);
    }

    const currentCity = cities.find(city => city.id === loadedCity?.id);

    if ((currentCity === undefined) && (loadedCity !== null) && (loadedCity.cod === 200)) {
      setCities((currentCities) => [...currentCities, loadedCity]);
    }

    setValue('');
  };

  const removeItem = (city: WeatherFromAPI) => {
    const clearCity = cities.filter(newCity => newCity.id !== city.id);

    setCities([...clearCity]);
  };

  return (
    <div className="App">
      <div className="App__nav">
        <select
          value={language}
          onChange={selectedLanguage}
          className="App__language form-select"
        >
          <option value="en">
            English
          </option>

          <option value="ua">
            Ukrainian
          </option>

          <option value="ru">
            Russian
          </option>
        </select>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Choose city"
            aria-label="Choose city"
            aria-describedby="button-addon2"
            value={value}
            onChange={onChange}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={addCard}
          >
            Add
          </button>
        </div>
        {error && (
          <div
            className="alert alert-danger"
          >
            {error}
          </div>
        )}
      </div>
      <div className="App__body">
        <CityCards
          cities={cities}
          language={language}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
};
