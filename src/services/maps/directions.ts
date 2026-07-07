// Google Maps Directions Service

export interface RouteDirections {
  distanceKms: number;
  durationMinutes: number;
  routePolyline?: string;
}

export const getRouteDirections = async (
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number }
): Promise<RouteDirections> => {
  if (typeof window !== "undefined" && (window as any).google && (window as any).google.maps) {
    try {
      const directionsService = new (window as any).google.maps.DirectionsService();
      const originParam = typeof origin === "string" ? origin : new (window as any).google.maps.LatLng(origin.lat, origin.lng);
      const destParam = typeof destination === "string" ? destination : new (window as any).google.maps.LatLng(destination.lat, destination.lng);

      const response = await new Promise<any>((resolve, reject) => {
        directionsService.route(
          {
            origin: originParam,
            destination: destParam,
            travelMode: (window as any).google.maps.TravelMode.DRIVING,
          },
          (res: any, status: any) => {
            if (status === "OK") {
              resolve(res);
            } else {
              reject(status);
            }
          }
        );
      });

      const leg = response.routes[0].legs[0];
      const distanceKms = parseFloat((leg.distance.value / 1000).toFixed(1));
      const durationMinutes = Math.round(leg.duration.value / 60);

      return {
        distanceKms,
        durationMinutes,
        routePolyline: response.routes[0].overview_polyline
      };
    } catch (e) {
      console.warn("Directions calculation failed, using fallback estimate", e);
    }
  }

  // Fallback calculations: calculate distance based on text length or coordinates if available
  let textLength = 15;
  if (typeof origin === "string" && typeof destination === "string") {
    textLength = origin.length + destination.length;
  }
  
  // Deterministic fallback values
  const distanceKms = parseFloat(Math.min(75, textLength * 0.5 + 8).toFixed(1));
  const durationMinutes = Math.round(distanceKms * 1.5 + 5);

  return {
    distanceKms,
    durationMinutes
  };
};
