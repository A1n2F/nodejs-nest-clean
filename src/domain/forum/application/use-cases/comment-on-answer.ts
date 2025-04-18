import { Either, left, right } from "../../../../core/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";

interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string 
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError,
    {
        answerComment: AnswerComment
    }
>

@Injectable()
export class CommentOnAnswerUseCase {
    constructor(
        private answerRepository: AnswerRepository,
        private answerCommentsRepository: AnswerCommentsRepository
    ) {}

    async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const question = await this.answerRepository.findById(answerId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        })

        await this.answerCommentsRepository.create(answerComment)

        return right({
            answerComment
        })
    }
}