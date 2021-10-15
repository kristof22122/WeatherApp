// export const BASE_URL = 'api.openweathermap.org/data/2.5/weather';

const API_KEY = 'c7b51f444a975bf9f7ef70112646932c';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/';

export const request = async (cityName: string, language: string) => {
  const response = await fetch(`${BASE_URL}weather?q=${cityName}&APPID=${API_KEY}&lang=${language}&units=metric`);

  return response.json();
};
