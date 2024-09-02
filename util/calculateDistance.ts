interface Coordinates {
    lat: number;
    lng: number;
}

export default function calculateDistance(point1: Coordinates, point2: Coordinates): number {
    const toRadians = (degree: number): number => degree * Math.PI / 180;

    const R = 6371; 
    const dLat = toRadians(point2.lat - point1.lat);
    const dLon = toRadians(point2.lng - point1.lng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; 
    return distance;
}


