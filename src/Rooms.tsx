import { useQuery } from 'react-query';
import { RoomData, RoomDataResponse } from './types';
import LastUpdate from './LastUpdate';
import IndoorRoomCard from './IndoorRoomCard';
import OutdoorRoomCard from './OutdoorRoomCard';
import PullToRefresh from 'rmc-pull-to-refresh';

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

    return (
        <PullToRefresh
            onRefresh={refetch}
            distanceToRefresh={50}
            indicator={{
                activate: 'Loslassen',
                release: 'Aktualisierung ...',
                deactivate: (data ?
                        <LastUpdate date={data.fetchDate} />
                    : 'Ziehen'
                ),
                finish: ' ',
            }}
        >
            {isLoading && (
                <div className="flex justify-center mb-4 text-sm">
                    Aktualisierung ...
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data &&
                    data.rooms.map((room: RoomData) =>
                        room.type == 'Indoor' ? (
                            <IndoorRoomCard data={room} key={room.name} />
                        ) : (
                            <OutdoorRoomCard data={room} key={room.name} />
                        )
                    )}
            </div>
        </PullToRefresh>
    );
}

export default Rooms;
