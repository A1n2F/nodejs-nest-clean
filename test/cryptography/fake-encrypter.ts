import { Encrypter } from "@/domain/forum/application/ctyptography/encrypter";

export class FakeEncrypter implements Encrypter {
    async encrypt(payload: Record<string, unknown>): Promise<string> {
        return JSON.stringify(payload)
    }

}