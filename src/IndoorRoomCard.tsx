import React from 'react';
import { ReactComponent as TemperatureIcon } from './icons/temperature.svg';
import { ReactComponent as ArrowUpIcon } from './icons/arrowUp.svg';
import { ReactComponent as ArrowDownIcon } from './icons/arrowDown.svg';
import { ReactComponent as HumidityIcon } from './icons/humidity.svg';
import { RoomData } from './types';

function IndoorRoomCard(props: { data: RoomData }) {
    const { data } = props;
    return (
        <div className="p-4 rounded-md shadow-md bg-gray-50 dark:bg-gray-700">
            <div className="flex">
                <h2 className="flex-grow text-xl font-bold">{data.name}</h2>
                <div className="flex flex-none items-center">
                    <TemperatureIcon className="icon" width="20" height="20" />
                    <span className="text-xl font-semibold">
                        {data.temperature} &#8451;
                    </span>
                </div>
            </div>
            <div className="flex mt-8">
                <div className="flex flex-grow">
                    <HumidityIcon className="icon" width="20" height="20" />
                    <span className="text-sm">{data.humidity} %</span>
                </div>

                <div className="flex">
                    <div className="flex">
                        <ArrowDownIcon
                            className="icon"
                            width="20"
                            height="20"
                        />
                        <span className="text-sm">
                            {data.minTemperature} &#8451;
                        </span>
                    </div>
                    <div className="flex">
                        <ArrowUpIcon className="icon" width="20" height="20" />
                        <span className="text-sm">
                            {data.maxTemperature} &#8451;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndoorRoomCard;
