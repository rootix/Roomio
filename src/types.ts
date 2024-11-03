export interface RoomDataResponse {
    fetchDate: Date;
    rooms: RoomData[];
}

export interface RoomData {
    name: string;
    type: 'Indoor' | 'Outdoor';
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
    humidity: number;
    pressure: number;
}

export interface InfluxQueryResponse {
    results: InfluxQueryResult[];
}

export interface InfluxQueryResult {
    statement_id: number;
    series: InfluxRoomDataResponse[];
}

export interface InfluxRoomDataResponse {
    name: string;
    tags: {
        name: string;
    };
    columns: string[];
    values: Array<[
        string,  // ISO timestamp
        number,  // min
        number,  // max
        number,  // last
        number,  // last_1
        number   // last_2
    ]>;
}
