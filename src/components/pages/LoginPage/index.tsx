import React, { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useAuth } from 'src/contexts/AuthContext';
import { useFlow } from 'src/utils/stackflow';
import Logo from 'src/assets/logo.png';
import { ReactComponent as Back } from 'src/assets/back-dark.svg';
import {
  Wrapper,
  FormContent,
  Tab,
  Tabs,
  Icon,
  Input,
  SubmitButton,
  ForgotPassword,
  BackButtonWrapper
} from './styled';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login, register, googleSignIn } = useAuth();
  const { push, pop } = useFlow();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      push('MainPage', {});
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      push('MainPage', {});
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      push('MainPage', {});
    } catch (error) {
      console.error('Google Sign-in error:', error);
    }
  };

  const handleBackClick = () => {
    pop();
  };

  return (
    <AppScreen appBar={{ title: 'Login' }}>
      <Wrapper>
        <FormContent>
          <BackButtonWrapper>
            <button onClick={handleBackClick}>
              <Back />
            </button>
          </BackButtonWrapper>
          <Icon>
            <img src={Logo} alt="Main Logo" />
          </Icon>
          <Tabs>
            <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Sign In</Tab>
            <Tab active={activeTab === 'register'} onClick={() => setActiveTab('register')}>Sign Up</Tab>
          </Tabs>
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <SubmitButton type="submit" value="Log In" />
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <SubmitButton type="submit" value="Sign Up" />
            </form>
          )}
          <SubmitButton type="button" onClick={handleGoogleSignIn} value="Sign in with Google" />
          {activeTab === 'login' && (
            <ForgotPassword>
              <a href="#">Forgot Password?</a>
            </ForgotPassword>
          )}
        </FormContent>
      </Wrapper>
    </AppScreen>
  );
};

export default LoginPage;
