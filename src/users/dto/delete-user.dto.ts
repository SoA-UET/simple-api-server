import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class DeleteUserDto {
	@ApiProperty({ description: "Id của user" })
	@IsMongoId({ message: "Id không hợp lệ" })
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}
}
