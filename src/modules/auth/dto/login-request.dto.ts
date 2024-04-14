import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {

    _id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}