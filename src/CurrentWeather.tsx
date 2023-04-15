import { ReactComponent as CloudyIcon } from './icons/cloudy.svg';
import { ReactComponent as VerySunnyIcon } from './icons/sun-hot.svg';
import { ReactComponent as SunnyIcon } from './icons/sun.svg';
import { ReactComponent as RainyIcon } from './icons/rain.svg';
import { ReactComponent as StormyIcon } from './icons/wind.svg';
import { ReactComponent as MoonIcon } from './icons/moon.svg';
import { isWithinInterval } from 'date-fns';
import { RoomData } from './types';
import React from 'react';

function CurrentWeather(props: {
    roomData: RoomData;
    sunrise: Date;
    sunset: Date;
}) {
    function calculatePressureOnSeaLevel() {
        const localPressure = props.roomData.pressure / 100;
        const metersOverSeaLevel = parseInt(
            process.env.REACT_APP_LOCATION_ELEVATION ?? '0'
        );
        const temperatureGradient = 0.0065;
        const temperatureOnSeaLevelInCelvin =
            props.roomData.temperature +
            temperatureGradient * metersOverSeaLevel +
            273.15;

        const pressureOnSeaLevel =
            localPressure /
            Math.pow(
                1 -
                    (temperatureGradient * metersOverSeaLevel) /
                        temperatureOnSeaLevelInCelvin,
                5.255
            );
        return Math.round(pressureOnSeaLevel * 100) / 100;
    }

    const weatherIcon = () => {
        if (
            !isWithinInterval(new Date(), {
                start: props.sunrise,
                end: props.sunset,
            })
        ) {
            return <MoonIcon width="75" height="75" />;
        }

        const pressure = calculatePressureOnSeaLevel();
        if (pressure >= 1040) {
            return <VerySunnyIcon width="75" height="75" />;
        } else if (pressure >= 1020) {
            return <SunnyIcon width="75" height="75" />;
        } else if (pressure >= 1000) {
            return <CloudyIcon width="75" height="75" />;
        } else if (pressure >= 980) {
            return <RainyIcon width="75" height="75" />;
        } else {
            return <StormyIcon width="75" height="75" />;
        }
    };

    return <div>{weatherIcon()}</div>;
}

export default CurrentWeather;
