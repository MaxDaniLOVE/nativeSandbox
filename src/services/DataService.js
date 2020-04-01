export default class DataService {
  async getCity() {
    const url = 'https://ipinfo.io/json?token=86d5efd448469d';
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('err')
    }
    const data = await res.json();
    return data.city;
  }
  async getLocation(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&language=en-US`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('err')
    }
    const data = await res.json();
    const lat = data.results[0].geometry.lat.toFixed(4);
    const lng = data.results[0].geometry.lng.toFixed(4);
    return {
      lat,
      lng
    };
  }

  async getWeatherForecast(location) {
    const { lat, lng} = location;
   
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.darksky.net/forecast/d8563055b51df9f6d5d4e5e6093857fb/${lat},${lng}?units=si/`;
    const res = await fetch(`${proxyUrl}${url}`);

    if (!res.ok) {
      throw new Error(proxyUrl + url)
    }
    const data = await res.json();
    
    return data;
  }

  async getAllData() {
    const city = await this.getCity();
    const location = await this.getLocation(city);
    const forecast = await this.getWeatherForecast(location);
    const data = {
      city,
      location,
      forecast
    }
    // console.log(forecast)
    return data
  }
}