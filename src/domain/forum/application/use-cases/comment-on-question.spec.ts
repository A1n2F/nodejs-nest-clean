import { expect, describe, beforeEach, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe("Comment On Question", () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository ,inMemoryQuestionCommentsRepository)
    })
    
    it("should be able to comment on question", async () => {    
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const result = await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: "Comentário  teste"
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual("Comentário  teste")
    })
})
