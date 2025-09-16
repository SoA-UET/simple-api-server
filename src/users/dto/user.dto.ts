import { Exclude, Expose } from "class-transformer";
import { ExposeId } from "src/common/decorators/expose-id.decorator";

@Exclude()
export class UserDto {
    @ExposeId()
    readonly id?: string;

    @Expose()
    readonly email: string;

    @Expose()
    readonly full_name: string;
};
