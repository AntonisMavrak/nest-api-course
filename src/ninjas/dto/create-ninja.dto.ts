import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(["shuriken", "katana", "nunchaku"], {message: "Weapon must be either shuriken, katana or nunchaku"})
  weapon: string;
}