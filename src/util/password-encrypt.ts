import crypto from "crypto";

async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {

        // Generating salt
        const salt = crypto.randomBytes(8).toString("hex");

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

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString("hex"));
        });
    })
}

export { hashPassword, checkPassword };