import TemperatureIcon from './icons/temperature.svg?react';
import ArrowUpIcon from './icons/arrowUp.svg?react';
import ArrowDownIcon from './icons/arrowDown.svg?react';
import HumidityIcon from './icons/humidity.svg?react';
import { RoomData } from './types';

function IndoorRoomCard(props: { data: RoomData }) {
    const { data } = props;
    return (
        <div className="p-4 rounded-md shadow-md bg-gray-50 dark:bg-gray-700">
            <div className="flex">
                <h2 className="flex-grow text-xl font-bold">{data.name}</h2>
                <div className="flex flex-none items-center">
                    <TemperatureIcon className="icon" width="20" height="20" />
                    <span className="text-xl font-semibold ml-2">
                        {data.temperature} &#8451;
                    </span>
                </div>
            </div>
            <div className="flex mt-8">
                <div className="flex flex-grow">
                    <HumidityIcon className="icon" width="20" height="20" />
                    <span className="text-sm ml-2">{data.humidity} %</span>
                </div>

                <div className="flex">
                    <div className="flex">
                        <ArrowDownIcon
                            className="icon"
                            width="20"
                            height="20"
                        />
                        <span className="text-sm ml-2">
                            {data.minTemperature} &#8451;
                        </span>
                    </div>
                    <div className="ml-3 flex">
                        <ArrowUpIcon className="icon" width="20" height="20" />
                        <span className="text-sm ml-2">
                            {data.maxTemperature} &#8451;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndoorRoomCard;
