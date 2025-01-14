
import type { FormInputs } from '~/types/auth';

export async function SignUpValidation(inputs: FormInputs) {
  console.log(inputs);
  if (!inputs.email.value) {
    inputs.email.error = 'Email is required';
  } else {
    const response = await fetch(`https://bolt-api-o83q.onrender.com/api/v1/users/check-email?email=${encodeURIComponent(inputs.email.value)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const user: any = await response.json();
    console.log(user);
    if (!user.error) {
      inputs.email.error = 'Email already exists';
    }
  }
  if (!inputs.username.value) {
    inputs.username.error = 'Username is required';
  } else {
    const response = await fetch(`https://bolt-api-o83q.onrender.com/api/v1/users/check-username?name=${encodeURIComponent(inputs.username.value)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const user: any = await response.json();

    if (!user.error) {
      inputs.username.error = 'Username already exists';
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
  if (inputs.password.value !== inputs.confirmPassword.value) {
    inputs.confirmPassword.error = 'Passwords do not match';
  }

  return inputs;
}
