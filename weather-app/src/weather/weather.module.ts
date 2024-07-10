import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { GeolocationService } from './geolocation.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, GeolocationService],
})
export class WeatherModule {}
