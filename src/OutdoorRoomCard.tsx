import TemperatureIcon from './icons/temperature.svg?react';
import ArrowUpIcon from './icons/arrowUp.svg?react';
import ArrowDownIcon from './icons/arrowDown.svg?react';
import HumidityIcon from './icons/humidity.svg?react';
import SunriseIcon from './icons/sunrise.svg?react';
import SunsetIcon from './icons/sunset.svg?react';
import CurrentWeather from './CurrentWeather';
import { RoomData } from './types';
import SunCalc from 'suncalc';
import { format } from 'date-fns';

function OutdoorRoomCard(props: { data: RoomData }) {
    const { data } = props;

    const sunTimes = SunCalc.getTimes(
        new Date(),
        import.meta.env.VITE_LOCATION_LATITUDE,
        import.meta.env.VITE_LOCATION_LONGITUDE
    );

    return (
        <div className="p-3 rounded-md shadow-md bg-blue-500 col-span-1 text-gray-50 sm:col-span-2 h-32">
            <div className="flex h-full">
                <div className="flex flex-col justify-between w-2/5 h-full">
                    <h2 className="text-xl font-bold">{data.name}</h2>
                    <div className="flex">
                        <HumidityIcon className="icon" width="20" height="20" />
                        <span className="text-sm ml-2">{data.humidity} %</span>
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
                            <span className="text-sm ml-2">
                                {format(sunTimes.sunrise, 'kk:mm')}
                            </span>
                        </div>
                        <div className="flex ml-3">
                            <SunsetIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm ml-2">
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
                        <span className="text-xl font-semibold ml-2">
                            {data.temperature} &#8451;
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row">
                        <div className="ml-2 flex justify-between sm:order-2">
                            <ArrowUpIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm ml-2">
                                {data.maxTemperature} &#8451;
                            </span>
                        </div>
                        <div className="ml-2 flex justify-between mt-0 sm:mt-0 sm:order-1">
                            <ArrowDownIcon
                                className="icon"
                                width="20"
                                height="20"
                            />
                            <span className="text-sm ml-2">
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
