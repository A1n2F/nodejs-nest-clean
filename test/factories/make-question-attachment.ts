import { QuestionAttachment, QuestionAttachmentProps } from "src/domain/forum/enterprise/entities/question-attachment";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

export function makeQuestionAttachment(
    override: Partial<QuestionAttachmentProps> = {},
    id?: UniqueEntityID
) {
    const questionAttachment = QuestionAttachment.create({
        questionId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override
    }, id)

    return questionAttachment
}