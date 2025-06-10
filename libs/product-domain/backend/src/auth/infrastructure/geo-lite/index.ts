import * as geoip from 'geoip-lite';

/**
 * Gets a geolocation string from an IP address using geoip-lite.
 */
export async function getGeoLocation(IP: string): Promise<string> {
  const geo = geoip.lookup(IP);
  if (!geo) {
    return 'unknown';
  }
  const { country, region, city } = geo;
  return [country, region, city].filter(Boolean).join(', ');
}
