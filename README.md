# authorization-screen

Небольшой проект — экран авторизации (React + TypeScript + Vite) с демо-реализацией 2FA и моками API (React Query). Проект сделан как тестовое задание: аккуратный UI (Tailwind), валидация (zod), эмуляция сетевых сценариев и все варианты ошибок API.

- макет: [Figma](https://www.figma.com/design/TUs0yc4YQtkpMhHvawK5iG/Test?node-id=0-1&p=f&t=eJY4UnU9d0kZpD8T-0)
- Демо: [authorization-screen](https://authorization-screen-teal.vercel.app/)

---

## Что внутри

- `LoginForm` — форма для ввода `email` + `password`. При успешном логине сервер возвращает `otpToken`.
- `Otp` — ввод 6-значного кода (2FA). Код проверяется через mock API; если истёк — предлагается запросить новый.
- Моки API (файлы в `src/api`) хранят логику генерации/проверки OTP и возвращают realistic ошибки: `invalid`, `expired`, `network`.
- Используется `@tanstack/react-query` для запросов/мутаций и для демонстрации обработки всех состояний (`isLoading`, `isError`, `data`).

---

## Быстрый старт

Требования: Node 18+ (рекомендуется)

```bash
# клон репозитория
git clone https://github.com/Alex-Nicalace/authorization-screen.git
cd authorization-screen

# установить зависимости
npm install

# запустить dev-сервер
npm run dev
```

Открой `http://localhost:5173` (или адрес, который покажет Vite).

---

## Демонстрационные данные (для локального тестирования)

- **Email:** `user@test.com`
- **Password:** `12345678`

Это `demo`-пользователь — при успешном входе сервер (мок) создаёт `otpToken` и генерирует код. В реальном приложении код не возвращается клиенту; здесь он может логироваться в консоль в dev-режиме для удобства тестирования.

---

## Реализованные сценарии мок-API

`login(email, password)`

- Успех: возвращает `{ token }` и генерирует OTP, привязанный к токену.
- Ошибки: пустой email/password, неверные данные.

`verifyOtp({ token, code })`

- Успех: `{ success: true }`.
- Неверный код: `{ success: false, reason: 'invalid' }`.
- Истёкший код: `{ success: false, reason: 'expired' }`.
- Случайный network error для демонстрации обработки ошибок.

`regenerateOtp(token)`

- Генерирует новый код и обновляет `expiresAt` на сервере (для demo: возвращает `expiresAt` или статус success). В реальном бэкенде код не возвращается клиенту.

---

## Структура проекта (основные папки)

```
src/
├─ api/           # мок-эндпоинты (login, verifyOtp, regenerateOtp)
├─ components/    # ui-кирпичики (Input, Button, OtpInput и т.д.)
├─ features/      # LoginForm, OtpForm
├─ hooks/         # хуки для React Query и утилиты
├─ styles/        # Tailwind + глобальные настройки
└─ App.tsx, main.tsx
```

---

## Как проверяются состояния (коротко)

- **Login:** форма валидируется локально (zod). После успешной валидации вызывается `login` (React Query mutation). По `onSuccess` родительская страница получает `otpToken` и переключается на форму OTP.
- **Otp:** ввод 6 цифр триггерит `verifyOtp` (mutation). Компонент следит за `mutation.isLoading`, `mutation.isError`, `mutation.data` и выставляет состояния `typing | expired | valid`.
- Все сценарии ошибок смоделированы в мок-API и должны быть видны при тестировании (network failures, invalid code, expired).
