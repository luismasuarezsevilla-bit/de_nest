import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { ReservationsService } from './reservations.service.js';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Público
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  // Protegido con API key
  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }
}
