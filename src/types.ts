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
