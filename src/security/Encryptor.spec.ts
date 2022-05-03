import Encryptor from "./Encryptor"

test("should return true for a valid password", async () => {
  const encryptor = new Encryptor("123")
  const password = "123456"
  const hashedPassword = await encryptor.hashPassword(password)

  expect.assertions(1)
  expect(await encryptor.checkPassword("123456", hashedPassword)).toBeTruthy()
})

test("should return false for a invalid password", async () => {
  const encryptor = new Encryptor("123")
  const password = "123456"
  const hashedPassword = await encryptor.hashPassword(password)

  expect.assertions(1)
  expect(await encryptor.checkPassword("12345", hashedPassword)).toBeFalsy()
})

test("A different encryptor without secret should not decrypt password", async () => {
  const encryptor = new Encryptor("123")
  const encryptor2 = new Encryptor("1234")
  const password = "123456"
  const hashedPassword = await encryptor.hashPassword(password)

  expect.assertions(1)
  expect(await encryptor2.checkPassword("12345", hashedPassword)).toBeFalsy()
})
