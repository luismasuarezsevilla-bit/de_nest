import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';

@Injectable()
export class ReservationsService {
  private reservations: (CreateReservationDto & { id: number })[] = [];
  private nextId = 1;

  create(dto: CreateReservationDto) {
    const reservation = { id: this.nextId++, ...dto };
    this.reservations.push(reservation);
    return reservation;
  }

  findAll() {
    return this.reservations;
  }
}
