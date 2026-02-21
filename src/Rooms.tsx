import { useQuery } from '@tanstack/react-query';
import {InfluxQueryResponse, RoomData, RoomDataResponse} from './types';
import IndoorRoomCard from './IndoorRoomCard';

import OutdoorRoomCard from './OutdoorRoomCard';
import PullToRefresh from 'pulltorefreshjs';
import { useEffect, useState } from 'react';
import LastUpdate from './LastUpdate';

function Rooms() {
    const roundNumber = (value: number) => Math.round(value * 10) / 10;
    const [isPullRefreshing, setIsPullRefreshing] = useState(false);

    const { isLoading, isError, error, data, refetch } = useQuery({ queryKey: ['roomData'], retry: 1, networkMode: 'always', queryFn: () => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000);
        return fetch(
            `${import.meta.env.VITE_INFLUX_DB_HOST}/query?db=ruuvi&q=SELECT%20MIN(temperature),%20MAX(temperature),%20LAST(temperature),%20LAST(humidity),%20LAST(pressure)%20FROM%20ruuvi_measurements%20WHERE%20time%20>%20now()%20-%201d%20GROUP BY%20"name"`,
            { signal: controller.signal }
        )
            .then((res) => {
                if (!res.ok) throw new Error('Keine Verbindung zur Datenquelle');
                return res.json();
            })
            .then((res: InfluxQueryResponse) => {
                if (res.results[0].error) throw new Error(res.results[0].error);
                const roomDataResponse: RoomDataResponse = {
                    fetchDate: new Date(),
                    rooms: (res.results[0].series ?? []).map((room) => {
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
            .catch((err) => {
                if (err.name === 'AbortError' || err instanceof TypeError) {
                    throw new Error('Keine Verbindung zur Datenquelle');
                }
                throw err;
            });
    }});

    useEffect(() => {
        const pullToRefresh = PullToRefresh.init({
            mainElement: '#root',
            instructionsPullToRefresh: 'Ziehen zum aktualisieren',
            instructionsReleaseToRefresh: 'Loslassen',
            instructionsRefreshing: 'Aktualisierung',
            onRefresh() {
                setIsPullRefreshing(true);
                return refetch().finally(() => setIsPullRefreshing(false));
            },
        });

        return pullToRefresh.destroy;
    }, []);

    return (
        <div>
            {isLoading && !isPullRefreshing && (
                <div className="flex justify-center mb-4 text-sm">
                    Aktualisierung ...
                </div>
            )}
            {isError && (
                <div className="flex justify-center mb-4 text-sm text-red-500 dark:text-red-400">
                    {(error as Error)?.message ?? 'Keine Verbindung zur Datenquelle'}
                </div>
            )}
            {data && data.rooms.length === 0 && (
                <div className="flex justify-center mb-4 text-sm text-yellow-600 dark:text-yellow-400">
                    Keine Daten der letzten 24 Stunden
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
