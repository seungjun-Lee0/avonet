import React from 'react';
import { Stack } from './utils/stackflow';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default App;
