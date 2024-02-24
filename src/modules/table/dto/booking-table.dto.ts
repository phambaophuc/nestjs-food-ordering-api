import { ApiProperty } from "@nestjs/swagger";

export class BookingTableDto {
    @ApiProperty()
    bookingTime: string;

    @ApiProperty()
    customer: string;

    @ApiProperty()
    phoneNumber: string;
}
