import { useQuery } from 'react-query';
import { RoomData, RoomDataResponse } from './types';
import IndoorRoomCard from './IndoorRoomCard';

import OutdoorRoomCard from './OutdoorRoomCard';
import PullToRefresh from 'pulltorefreshjs';
import { useEffect } from 'react';
import LastUpdate from './LastUpdate';

function Rooms() {
    const roundNumber = (value: number) => Math.round(value * 10) / 10;

    const { isLoading, data, refetch } = useQuery('roomData', () =>
        fetch(
            `${process.env.REACT_APP_INFLUX_DB_HOST}/query?db=ruuvi&q=SELECT%20MIN(temperature),%20MAX(temperature),%20LAST(temperature),%20LAST(humidity),%20LAST(pressure)%20FROM%20ruuvi_measurements%20WHERE%20time%20>%20now()%20-%201d%20GROUP BY%20"name"`
        )
            .then((res) => res.json())
            .then((res) => {
                const roomDataResponse: RoomDataResponse = {
                    fetchDate: new Date(),
                    rooms: res.results[0].series.map((room: any) => {
                        const parsedRoomData: RoomData = {
                            name: room.tags['name'],
                            type:
                                room.tags['name'] === 'Aussen'
                                    ? 'Outdoor'
                                    : 'Indoor',
                            temperature: roundNumber(room.values[0][3]),
                            minTemperature: roundNumber(room.values[0][1]),
                            maxTemperature: roundNumber(room.values[0][2]),
                            humidity: roundNumber(room.values[0][4]),
                            pressure: roundNumber(room.values[0][5]),
                        };

                        return parsedRoomData;
                    }),
                };

                return roomDataResponse;
            })
    );

    useEffect(() => {
        PullToRefresh.init({
            mainElement: 'body',
            instructionsPullToRefresh: 'Ziehen zum aktualisieren',
            instructionsReleaseToRefresh: 'Loslassen',
            instructionsRefreshing: 'Aktualisierung',
            onRefresh() {
                return refetch();
            },
        });
    }, PullToRefresh.destroyAll());

    return (
        <div>
            {isLoading && (
                <div className="flex justify-center mb-4 text-sm">
                    Aktualisierung ...
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data &&
                    data.rooms.map((room: RoomData) =>
                        room.type == 'Indoor' ? (
                            <IndoorRoomCard data={room} key={room.name} />
                        ) : (
                            <OutdoorRoomCard data={room} key={room.name} />
                        )
                    )}
            </div>
            {data && (
                <div className="flex justify-center text-sm mt-4">
                    Letzte Aktualisierung:&nbsp;
                    <LastUpdate date={data.fetchDate} />
                </div>
            )}
        </div>
    );
}

export default Rooms;
