import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш телефон и пароль для входа в систему"
      form={<LoginForm />}
      footerText={undefined}
    />
  );
}

export const Component = LoginPage;
