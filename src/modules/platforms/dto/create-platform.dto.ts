import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlatformDTO {
    @IsNotEmpty({message: 'the name cannot be empty'})
    @IsString()
    name: string;
}