import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty()
    customer: string;

    @ApiProperty()
    rating: number;

    @ApiProperty()
    comment: string;
}
