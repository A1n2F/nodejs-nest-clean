import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import request from "supertest"

describe("Create acccount (E2E)", () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService) 

        await app.init()
      });

    test("[POST] /accounts", async() => {
        const response = await request(app.getHttpServer()).post("/accounts").send({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456"
        })

        expect(response.statusCode).toBe(201)

        const userOnDatabase = await prisma.user.findUnique({
            where: {
                email: "johndoe@email.com",
            }
        })

        expect(userOnDatabase).toBeTruthy()
    })
})