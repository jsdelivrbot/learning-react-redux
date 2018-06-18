import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
class WeatherList extends Component {
    constructor(props){
        super(props);
    }
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(ele => ele.main.temp);
        const pressures = cityData.list.map(ele => ele.main.pressure);
        const humidities = cityData.list.map(ele => ele.main.humidity);
        const {lon, lat} = cityData.city.coord;
        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td><Chart units="K" data={temps} color="orange"/></td>
                <td><Chart units="hPa" data={pressures} color="blue"/></td>
                <td><Chart units="%" data={humidities} color="red"/></td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (K)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

//function mapStateToProps(state){ weather:state.weather} or es6 way
function mapStateToProps({weather}) {
    return {weather}
}

export default connect(mapStateToProps)(WeatherList);