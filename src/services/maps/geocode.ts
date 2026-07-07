// Google Maps Geocoding Service

export interface GeocodeResult {
  lat: number;
  lng: number;
  address: string;
}

// Convert address to coordinates
export const geocodeAddress = async (address: string): Promise<GeocodeResult> => {
  if (typeof window !== "undefined" && (window as any).google && (window as any).google.maps) {
    try {
      const geocoder = new (window as any).google.maps.Geocoder();
      const result = await new Promise<any>((resolve, reject) => {
        geocoder.geocode({ address }, (results: any[] | null, status: any) => {
          if (status === "OK" && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(status);
          }
        });
      });
      return {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
        address: result.formatted_address
      };
    } catch (e) {
      console.warn("Geocoding failed, using deterministic mock coordinates", e);
    }
  }

  // Generate deterministic lat/lng from string hash as fallback
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  const lat = 28.6139 + (hash % 100) / 1000;
  const lng = 77.2090 + (hash % 200) / 1000;

  return {
    lat,
    lng,
    address
  };
};
