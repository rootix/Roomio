import React from 'react';
import { ReactComponent as TemperatureIcon } from './icons/temperature.svg';
import { ReactComponent as ArrowUpIcon } from './icons/arrowUp.svg';
import { ReactComponent as ArrowDownIcon } from './icons/arrowDown.svg';
import { ReactComponent as HumidityIcon } from './icons/humidity.svg';
import { ReactComponent as SunriseIcon } from './icons/sunrise.svg';
import { ReactComponent as SunsetIcon } from './icons/sunset.svg';
import CurrentWeather from './CurrentWeather';
import { RoomData } from './types';
import SunCalc from 'suncalc';
import { format } from 'date-fns';

function OutdoorRoomCard(props: { data: RoomData }) {
    const { data } = props;

    const sunTimes = SunCalc.getTimes(
        new Date(),
        process.env.REACT_APP_LOCATION_LATITUDE,
        process.env.REACT_APP_LOCATION_LONGITUDE
    );

    return (
        <div className="p-3 rounded-md shadow-md bg-blue-500 col-span-1 text-gray-50 sm:col-span-2 h-32">
            <div className="flex h-full">
                <div className="flex flex-col justify-between w-2/5 h-full">
                    <h2 className="text-xl font-bold">{data.name}</h2>
                    <div className="flex">
                        <HumidityIcon className="icon" width="20" height="20" />
                        <span className="text-sm">{data.humidity} %</span>
                    </div>
                </div>

                <div className="flex flex-col justify-between items-center w-1/5">
                    <CurrentWeather
                        roomData={data}
                        sunrise={sunTimes.sunrise}
                        sunset={sunTimes.sunset}
                    />
                    <div className="flex">
                        <div className="flex">
                            <SunriseIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm">
                                {format(sunTimes.sunrise, 'kk:mm')}
                            </span>
                        </div>
                        <div className="flex ml-2">
                            <SunsetIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm">
                                {format(sunTimes.sunset, 'kk:mm')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex w-2/5 flex-grow flex-col justify-between items-end h-full">
                    <div className="flex justify-end items-center">
                        <TemperatureIcon
                            className="icon"
                            width="20"
                            height="20"
                        />
                        <span className="text-xl font-semibold">
                            {data.temperature} &#8451;
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row">
                        <div className="flex justify-between sm:order-2">
                            <ArrowUpIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm">
                                {data.maxTemperature} &#8451;
                            </span>
                        </div>
                        <div className="flex justify-between mt-0 sm:mt-0 sm:order-1">
                            <ArrowDownIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm">
                                {data.minTemperature} &#8451;
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutdoorRoomCard;
