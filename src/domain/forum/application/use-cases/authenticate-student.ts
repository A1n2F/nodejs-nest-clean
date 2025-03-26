import { Injectable } from "@nestjs/common";
import { Either, left, right } from "../../../../core/either";
import { StudentRepository } from "../repositories/students-repository";
import { HashComparer } from "../ctyptography/hash-comparer";
import { Encrypter } from "../ctyptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateStudentUseCaseRequest {
    email: string
    password: string
}

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError,
    {
        accessToken: string
    }
>

@Injectable()
export class AuthenticateStudentUseCase {
    constructor(
        private studentsRepository: StudentRepository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter
    ) {}

    async execute({ email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
        const student = await this.studentsRepository.findByEmail(email)
        
        if (!student) {
            return left(new WrongCredentialsError())
        }

        const isPasswordValid = await this.hashComparer.compare(password, student.password)
        
        if (!isPasswordValid) {
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })
        
        return right({
            accessToken
        })
    }
}