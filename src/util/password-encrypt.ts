import crypto from "crypto";

async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {

        // Generating salt
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            // Error creating hash
            if (err) reject(err);
            // Everything is allright
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        })
    })
}

async function checkPassword(password: string, hash: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const keyBuffer = Buffer.from(key, "hex");

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
        })
    })
}

export { hashPassword, checkPassword };