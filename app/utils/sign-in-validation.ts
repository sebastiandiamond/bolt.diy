import type { LoginFormInputs } from '~/types/auth';

export async function SignInValidation(inputs: LoginFormInputs) {
  if (!inputs.email_username.value) {
    inputs.email_username.error = 'email_username is required';
  } else {
    const emailOrUsername = inputs.email_username.value;
    const emailResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/check-email?email=${encodeURIComponent(emailOrUsername)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const emailUser: any = await emailResponse.json();

    const usernameResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/check-username?name=${encodeURIComponent(emailOrUsername)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const usernameUser: any = await usernameResponse.json();

    if (!emailUser && !usernameUser) {
      inputs.email_username.error = 'Email or Username does not exist';
    }
  }
  if (!inputs.password.value) {
    inputs.password.error = 'Password is required';
  } else {
    const password = inputs.password.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigitOrSymbol = /[\d\W]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasDigitOrSymbol) {
      inputs.password.error = 'Password must contain at least 1 uppercase, 1 lowercase, and 1 digit or symbol';
    }
  }

  return inputs;
}
