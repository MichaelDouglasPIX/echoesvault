export class PlayerDTO {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly birthDate?: string,
        readonly gender?: string
    ) { }
}