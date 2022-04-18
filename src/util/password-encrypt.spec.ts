import { checkPassword, hashPassword } from "./password-encrypt"

test('should return true for a valid password', async () => {

    const password = "123456";
    const hashedPassword = await hashPassword(password);

    expect(await checkPassword("123456", hashedPassword)).toBeTruthy();
})

test('should return false for a invalid password', async () => {

    const password = "123456";
    const hashedPassword = await hashPassword(password);

    expect(await checkPassword("1234567", hashedPassword)).toBeFalsy();
})