import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LibraryEntity } from "./library.entity";
import { Repository } from "typeorm";
import { LibraryGameEntity } from "./library-game.entity";

@Injectable()
export class LibraryGameService {
    constructor(
        @InjectRepository(LibraryGameEntity)
        private readonly libraryGameRepository: Repository<LibraryGameEntity>,
        @InjectRepository(LibraryEntity)
        private readonly libraryRepository: Repository<LibraryEntity>,
    ) { }

    async create(playerId: string) {

    }

    async findAll() {

    }

    async update() {

    }

    async remove() {

    }
}