import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validator/email.validator";

export class CreatePlayerDTO {
    @IsNotEmpty({ message: 'the user cannot be empty' })
    username: string;

    @MinLength(6, { message: 'the password must have at least 6 characters' })
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    biography: string;

    @IsOptional()
    @IsString()
    birthDate: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsEmail(undefined, { message: 'the provided email is invalid' })
    @UniqueEmail({ message: 'email already registered' })
    email: string;
}