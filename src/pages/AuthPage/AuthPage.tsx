import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";

// interface AuthPageProps {}
export default function AuthPage(/*{ }: AuthPageProps*/) {
  return (
    <main className="page-container flex min-h-full items-center justify-center">
      <LoginForm className="max-w-110" />
      <OtpForm className="max-w-110" />
    </main>
  );
}
