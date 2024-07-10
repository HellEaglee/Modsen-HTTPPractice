import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GeolocationService {
  private apiKey: string;

  constructor(private httpService: HttpService) {
    this.apiKey = 'c9701155f6d87b9e737bcc2ea0bb71f8'; // Replace with your actual API key
  }

  async getGeolocation(city: string): Promise<any> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    try {
      const response: AxiosResponse<any> = await lastValueFrom(
        this.httpService.get(url),
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      } else {
        throw new Error('No geolocation data found');
      }
    } catch (error) {
      console.error('Error fetching geolocation data:', error.message);
      throw new HttpException(
        'Error fetching geolocation data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
