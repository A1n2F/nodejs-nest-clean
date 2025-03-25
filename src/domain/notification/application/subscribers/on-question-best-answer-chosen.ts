import { DomainEvents } from "src/core/events/domain-events";
import { EventHandler } from "src/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswerRepository } from "src/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChoseEvent } from "src/domain/forum/enterprise/events/quesiton-best-answer-chosen-event";

export class OnQuestionBestAnswerChosen implements EventHandler {
    constructor(
        private answersRepository: AnswerRepository,
        private sendNotification: SendNotificationUseCase
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChoseEvent.name)
    }

    private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChoseEvent) {
        const answer = await this.answersRepository.findById(bestAnswerId.toString())
    
        if (answer) {
            await this.sendNotification.execute({
                recipientId: answer.authorId.toString(),
                title: `Sua resposta foi escolhida!`,
                content: `A resposta que você enviou em "${question.title.substring(0, 20).concat("...")}" foi escolhida pelo autor!`,
            })
        }

    }
    
}