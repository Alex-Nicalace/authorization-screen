import { delay } from "../utils/helpers/delay";

interface LoginParams {
  email: string;
  password: string;
}

interface VerifyOtpParams {
  code: number;
  token: string;
}

export const DEMO_OTP_VALID = {
  email: "user@test.com",
  password: "12345678",
  code: 123456,
};

const EXPIRE_TIME = 30; // сек
const OTP_STORE = new Map<string, { code: number; expiresAt: number }>();

export async function login({ email, password }: LoginParams) {
  await delay(1000);

  if (email === DEMO_OTP_VALID.email && password === DEMO_OTP_VALID.password) {
    const token = "test-token";
    const code = DEMO_OTP_VALID.code;
    const expiresAt = Date.now() + EXPIRE_TIME * 1000;

    OTP_STORE.set(token, { code, expiresAt });

    return { token, expiresAt };
  }

  // demo ошибки
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  throw new Error("Invalid email or password");
}

export async function verifyOtp({ code, token }: VerifyOtpParams): Promise<{
  success: boolean;
  reason?: "expired" | "invalid";
}> {
  await delay(1000);

  const record = OTP_STORE.get(token);
  if (!record) return { success: false, reason: "invalid" };

  if (Date.now() > record.expiresAt) {
    return { success: false, reason: "expired" };
  }

  if (code !== record.code) {
    return { success: false, reason: "invalid" };
  }

  return { success: true };
}

export async function regenerateOtp(token: string): Promise<{
  success: boolean;
  expiresAt?: number;
  reason?: "not_found";
}> {
  await delay(800);

  const record = OTP_STORE.get(token);
  if (!record) {
    return { success: false, reason: "not_found" };
  }

  const code = DEMO_OTP_VALID.code;
  const expiresAt = Date.now() + EXPIRE_TIME * 1000;

  OTP_STORE.set(token, { code, expiresAt });

  return { success: true, expiresAt };
}
