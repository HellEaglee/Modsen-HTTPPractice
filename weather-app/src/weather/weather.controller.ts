import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService,
  ) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new HttpException('City is required', HttpStatus.BAD_REQUEST);
    }

    // Fetch geolocation data
    const geoData = await this.geolocationService.getGeolocation(city);
    if (!geoData || !geoData.lat || !geoData.lon) {
      throw new HttpException(
        'Geolocation data not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { lat, lon } = geoData;

    // Fetch weather data using the geolocation coordinates
    return this.weatherService.getWeather(lat, lon);
  }
}
