import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserDto {
    @Expose()
    readonly email: string;

    @Expose()
    readonly full_name: string;
};
