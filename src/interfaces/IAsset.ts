export interface IAsset {
    id: string;
    name: string;
    parentId: string | null;
    sensorId: string;
    sensorType: string | null;
    status: null | 'operating' | 'alert';
    gatewayId: string;
    locationId: string | null;
}