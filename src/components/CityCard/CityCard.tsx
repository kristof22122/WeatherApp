import React, { useState, useEffect } from 'react';
import './CityCard.scss';
import classNames from 'classnames';

type Props = {
  city: WeatherFromAPI;
  language: string;
  removeItem: (city: WeatherFromAPI) => void;
};

export const CityCard: React.FC<Props> = (props) => {
  const {
    city,
    language,
    removeItem,
  } = props;
  const {
    name,
    sys,
    main,
    wind,
    weather,
  } = city;

  const [metric, setMetric] = useState<string>('C');
  const [temp, setTemp] = useState<number>(main.temp);

  const getC = () => {
    setMetric('C');
  };

  const getF = () => {
    setMetric('F');
  };

  const dateBuilder = (currentDate: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const hours = currentDate.getHours();
    const min = currentDate.getMinutes();
    let minutes = '';

    if (min < 10) {
      minutes = `0${min}`;
    } else {
      minutes = `${min}`;
    }

    return `${day}, ${date} ${month}, ${hours}:${minutes}`;
  };

  useEffect(() => {
    let changeTemp = Math.round(main.temp);

    switch (metric) {
      case 'C':
        changeTemp = Math.round(main.temp);
        break;
      case 'F':
        changeTemp = Math.round(main.temp * 1.8 + 32);
        break;
      default:
        break;
    }

    setTemp(changeTemp);
  }, [metric]);

  return (
    <div
      className={classNames(
        'card',
        {
          card__warm: main.temp >= 0,
          card__cold: main.temp < 0,
        },
      )}
    >
      <div
        className="card__header"
      >
        <div className="card__title">
          <div>
            {`${name}, ${sys.country}`}
          </div>
          <div className="card__date">
            {dateBuilder(new Date())}
          </div>
        </div>
        <div className="card__weather">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt="icon"
            className="card__image"
          />
          <div className="card__weatherMain">
            {weather[0].main}
          </div>
          <div
            onClick={() => (
              removeItem(city)
            )}
            aria-hidden="true"
            className="card__close"
          >
            x
          </div>
        </div>
      </div>
      <div className="card__body">
        <div className="card__temp">
          <div className="card__tempInfo">
            <div className="card__tempCF">
              <div
                className="card__tempItem"
              >
                {temp}
              </div>
              <div
                className="card__c"
                onClick={getC}
                aria-hidden="true"
              >
                &#176;C
              </div>
              <div
                className="card__tempBreak"
              >
                |
              </div>
              <div
                className="card__f"
                onClick={getF}
                aria-hidden="true"
              >
                &#176;F
              </div>
            </div>
            <div className="card__tempFeelsLike">
              Feels like:
              {' '}
              {Math.ceil(main.feels_like)}
              &#176;C
            </div>
          </div>
        </div>
        <div className="card__info">
          <div className="">
            {(language === 'ru') && 'Давление: '}
            {(language === 'ua') && 'Тиск: '}
            {(language === 'en') && 'Pressure: '}
            <span
              className="card__infoValue"
            >
              {main.pressure}
              {(language === 'en') ? ' hPa' : ' гПа'}
            </span>
          </div>
          <div className="">
            {(language === 'ru') && 'Влажность: '}
            {(language === 'ua') && 'Вологість: '}
            {(language === 'en') && 'Humidity: '}
            <span
              className="card__infoValue"
            >
              {`${main.humidity}%`}
            </span>
          </div>
          <div className="">
            {(language === 'ru') && 'Сила ветра: '}
            {(language === 'ua') && 'Сила вітру: '}
            {(language === 'en') && 'Wind: '}
            <span
              className="card__infoValue"
            >
              {wind.speed}
              {(language === 'ru' || (language === 'ua'))
                && ' м/сек'}
              {(language === 'en')
                && ' m/sec'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
