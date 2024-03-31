import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { TableStatus } from "src/modules/enums/table-status.enum";

export class TableStatusDto {
    @IsEnum(TableStatus)
    @ApiProperty({ enum: TableStatus, enumName: 'TableStatus' })
    status: TableStatus;
}