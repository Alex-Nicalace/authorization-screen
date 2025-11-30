import { delay } from "../utils/helpers/delay";

type LoginParams = { email: string; password: string };

export async function login({ email, password }: LoginParams) {
  await delay(1000); // имитация сетевого запроса

  if (email === "user@test.com" && password === "12345678") {
    return { token: "mock-token", user: { name: "Test User" } };
  }

  // эмулируем разные типы ошибок
  if (email === "") throw new Error("Email не может быть пустым");
  if (password === "") throw new Error("Пароль не может быть пустым");
  throw new Error("Неверный email или пароль");
}
