import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    img: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    type: string;
}
