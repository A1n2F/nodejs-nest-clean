import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

@Module({
    providers: [
        PrismaService, 
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository,
        }, 
        {
            provide: StudentsRepository,
            useClass: PrismaStudentsRepository,
        },
        {
            provide: QuestionCommentsRepository,
            useClass: PrismaQuestionCommentsRepository,
        },
        {
            provide: QuestionAttachmentsRepository,
            useClass: PrismaQuestionAttachmentsRepository,
        },
        {
            provide: AnswerRepository,
            useClass: PrismaAnswerRepository,
        },
        {
            provide: AnswerCommentsRepository,
            useClass: PrismaAnswerCommentsRepository,
        },
        {
            provide: AnswerAttachmentsRepository,
            useClass: PrismaAnswerAttachmentsRepository,
        },
    ],
    exports: [
        PrismaService, 
        QuestionsRepository, 
        StudentsRepository,
        QuestionCommentsRepository, 
        QuestionAttachmentsRepository, 
        AnswerRepository,
        AnswerCommentsRepository,
        AnswerAttachmentsRepository
    ]
})
export class DatabaseModule {}