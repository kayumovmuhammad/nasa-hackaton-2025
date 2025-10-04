import getCookie from './getCookie';

export function signOut() {
  //   console.log('sign_out');
  localStorage.setItem('auth', '');
}

export default function login({ mail, password, navigate, setError, setIsLoading }) {
  fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/sign-in`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Mail: mail, Password: password })
  })
    .then((resp) => {
      if (!resp.ok) {
        setError('*Wrong email or password!');
      }
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data, data['status']);

      localStorage.setItem('auth', data['status']);
      localStorage.setItem('email', mail);
      navigate('/categories/plastic');
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
}

export function signUp({ mail, password, name, setError, setIsLoading, setConfirmPassword, setData, navigate }) {
  fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/sign-up`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Mail: mail, Password: password, Login: name })
  })
    .then((resp) => {
      if (!resp.ok) {
        setError('*This email is already used!');
        setIsLoading(false);
        return;
      }
      setError('');
      setConfirmPassword(true);
      setIsLoading(false);
      setData({ mail, password });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.name);
    });
}

export function confirmEmail({ email, password, code, setError, setIsLoading, navigate }) {
  setIsLoading(true);
  fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/confirm-email`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Mail: email,
      Password: code
    })
  })
    .then((resp) => {
      if (!resp.ok) {
        setError('*Incorrect code');
        setIsLoading(false);
        return;
      }
      console.log(resp);
      setIsLoading(false);
      login({ mail: email, password, navigate, setIsLoading });
    })
    .catch((e) => {
      setIsLoading(false);
      setError('*Incorrect code(try again)');
    });
}

export function isAuth() {
  console.log(getCookie('auth'));
  return !!getCookie('auth');
}