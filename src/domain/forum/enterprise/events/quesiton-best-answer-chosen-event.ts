import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { Question } from "../entities/question";

export class QuestionBestAnswerChoseEvent implements DomainEvent {
    public ocurredAt: Date
    public question: Question
    public bestAnswerId: UniqueEntityID

    constructor(question: Question, bestAnswerId: UniqueEntityID) {
        this.question = question
        this.bestAnswerId = bestAnswerId
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueEntityID {
        return this.question.id
    }
}