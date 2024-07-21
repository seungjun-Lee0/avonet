import React, { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useAuth } from 'src/contexts/AuthContext';
import { useFlow } from 'src/utils/stackflow';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, googleSignIn } = useAuth();
  const { push } = useFlow();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      push('MainPage', {});
    } catch (error) {
      console.error('Registration error:', error);
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

  return (
    <AppScreen appBar={{ title: 'Register' }}>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </AppScreen>
  );
};

export default RegisterPage;
