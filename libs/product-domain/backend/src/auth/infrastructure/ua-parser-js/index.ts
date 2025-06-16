import { UAParser } from 'ua-parser-js';
import { Services } from '../../domain';

/**
 * Parses a user agent string and returns browser, os, and device info.
 */
export const parseUserAgent: Services.ParseUserAgent = userAgent => {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  return {
    browser: browser.name ? `${browser.name} ${browser.version || ''}`.trim() : 'unknown',
    os: os.name ? `${os.name} ${os.version || ''}`.trim() : 'unknown',
    device: device.model ? `${device.vendor || ''} ${device.model}`.trim() : 'unknown',
  };
};
