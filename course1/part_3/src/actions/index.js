import axios from 'axios';
const API_KEY = '3fee68c7c31288f11960e481a37838e6';

export const FETCH_WEATHER ='FETCH_WEATHER';
export const rootUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchWeather(city){
    const url = `${rootUrl}&q=${city},us`;
    const request = axios.get(url);
    return{
        type:FETCH_WEATHER,
        payload:request
        //redux-promise middleware will transform the request (in Promise) to a flatten map results from the API call when promise is rejected/resovled. video 59
        // flow : to this action  > does it have a Promise? , if yes, stop the action, create a new action and return the results > back to reducers to set states;
    };
}