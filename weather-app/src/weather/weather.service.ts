import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private apiKey: string;

  constructor(private httpService: HttpService) {
    this.apiKey = 'c9701155f6d87b9e737bcc2ea0bb71f8'; // Replace with your actual API key
  }

  async getWeather(lat: number, lon: number): Promise<any> {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
    try {
      const response: AxiosResponse<any> = await lastValueFrom(
        this.httpService.get(url),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw new HttpException(
        'Error fetching weather data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
