import { AnswerAttachment, AnswerAttachmentProps } from "src/domain/forum/enterprise/entities/answer-attachment";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueEntityID
) {
    const answerAttachment = AnswerAttachment.create({
        answerId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override
    }, id)

    return answerAttachment
}