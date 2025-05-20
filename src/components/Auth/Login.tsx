import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { RootState, AppDispatch } from '../../store';
import EmptyLayout from '../Layout/EmptyLayout';
import HeaderAuth from './HeaderAuth';
// import FooterAuth from './FooterAuth';
import FormGroup from '../UI/FormGroup';
import Input from '../UI/Input';
import Label from '../UI/Label';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import FormFeedback from '../UI/FormFeedback';
import Alert from '../UI/Alert';
import { AlertTriangle } from 'lucide-react';

const Login: React.FC = () => {
  const [formControls, setFormControls] = useState({
    username: {
      value: '',
      valid: false,
      touched: false
    },
    password: {
      value: '',
      valid: false,
      touched: false
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const setMarkAttendance = useSelector((state: RootState) => state.auth.setMarkAttendance);

  useEffect(() => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');

    const rememberMeValue = localStorage.getItem('rememberme') === 'true';
    const username = rememberMeValue ? localStorage.getItem('username') || '' : '';
    const password = rememberMeValue ? localStorage.getItem('password') || '' : '';

    setRememberMe(rememberMeValue);

    setFormControls(prevState => ({
      ...prevState,
      username: {
        ...prevState.username,
        value: username,
        valid: username.length > 0,
        touched: username.length > 0
      },
      password: {
        ...prevState.password,
        value: password,
        valid: password.length > 0,
        touched: password.length > 0
      }
    }));
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      if (setMarkAttendance) {
        navigate('/mark-attendance');
      } else {
        navigate('/home');
      }
    }
  }, [isSignedIn, setMarkAttendance, navigate]);

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: 'username' | 'password') => {
    const value = event.target.value;
    const valid = value.length > 0;

    setFormControls(prevState => ({
      ...prevState,
      [controlName]: {
        ...prevState[controlName],
        value,
        valid,
        touched: true
      }
    }));
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const remember = event.target.checked;
    setRememberMe(remember);
    localStorage.setItem('rememberme', remember.toString());
  };

  const validate = () => {
    let isError = false;

    if (
      formControls.username.value.length === 0 ||
      formControls.password.value.length === 0
    ) {
      isError = true;
      setUsernameError('Please enter both username and password');
    } else {
      setUsernameError('');
    }

    setIsSubmitted(true);
    return isError;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('rememberme', rememberMe.toString());

    const err = validate();
    if (!err) {
      setUsernameError('');
      dispatch(actions.auth(formControls.username.value, formControls.password.value));
    }
  };

  let spinnerImage = loading ? (
    <div className="flex justify-center my-4">
      <div className="animate-pulse flex space-x-1">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="bg-blue-600 w-2 h-5 rounded"></div>
        ))}
      </div>
    </div>
  ) : null;

  let errorMessage = null;
  if (error) {
    errorMessage = (
      <Alert
        color="danger"
        className="mt-3"
        icon={<AlertTriangle className="h-5 w-5" />}
      >
        <div className="flex flex-col">
          <span className="font-bold">Error!</span>
          <span>{error}</span>
        </div>
      </Alert>
    );
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <div className="outer-login">
          <div className="login-bg"></div>
          <div className="login-section">
            <HeaderAuth title="Login" />

            {errorMessage}
            {spinnerImage}

            <form className="mb-6" onSubmit={submitHandler}>
              <FormGroup>
                <Label htmlFor="username">Email / Employee Code</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={formControls.username.value}
                  placeholder="Enter email or employee code..."
                  className="bg-white"
                  onChange={(event) => inputChangedHandler(event, 'username')}
                  invalid={
                    (!formControls.username.valid && formControls.username.touched) ||
                    (isSubmitted && !formControls.username.touched)
                  }
                />
                <FormFeedback>{usernameError}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={formControls.password.value}
                  placeholder="Password..."
                  className="bg-white"
                  onChange={(event) => inputChangedHandler(event, 'password')}
                  invalid={
                    (!formControls.password.valid && formControls.password.touched) ||
                    (isSubmitted && !formControls.password.touched)
                  }
                />
                <FormFeedback>{usernameError}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Checkbox
                  id="rememberMe"
                  label="Remember Password"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              </FormGroup>

              <Button
                color="success"
                block
                type="submit"
                disabled={loading}
              >
                Sign In
              </Button>
            </form>

            <div className="flex mb-3 forget-link">
              <Link
                to="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600 mt-6">
  <div>Can't access your account?</div>
  <div className="flex items-center space-x-1 text-green-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z" />
    </svg>
    <a
      href="mailto:mate@calpinetech.com"
      className="hover:underline"
    >
      mate@calpinetech.com
    </a>
  </div>
</div>
<div className="mt-6 text-center text-xs text-gray-600">
              <p>© {new Date().getFullYear()} Calpine group. All Rights Reserved.</p>
              <a 
                href="https://www.calpinetech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors duration-200"
              >
                www.calpinetech.com
              </a>
              <p className="mt-2 text-xs text-gray-400">v2.2.1</p>
            </div>
          </div>
        </div>
      </EmptyLayout.Section>
    </EmptyLayout>
  );
};

export default Login;
