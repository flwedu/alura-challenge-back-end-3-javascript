import crypto from "crypto";

export default class Encryptor {

    private secret;

    constructor(secret?: string) {
        this.secret = secret || process.env.secret || crypto.randomBytes(8).toString("hex");
    }

    async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {

            crypto.scrypt(password, this.secret, 64, (err, derivedKey) => {
                // Error creating hash
                if (err) reject(err);
                // Everything is allright
                resolve(`${this.secret}:${derivedKey.toString("hex")}`);
            })
        })
    }

    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {

        return new Promise((resolve, reject) => {
            const [salt, key] = hashedPassword.split(":");

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString("hex"));
            });
        })
    }

}