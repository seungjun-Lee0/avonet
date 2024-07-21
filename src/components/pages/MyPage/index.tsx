import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useAuth } from 'src/contexts/AuthContext';
import { useFlow } from 'src/utils/stackflow';

const MyPage: React.FC = () => {
  const { logout } = useAuth();
  const { push } = useFlow();

  const handleLogout = async () => {
    try {
      await logout();
      push('MainPage', {});
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppScreen appBar={{ title: 'My Page' }}>
      <div>
        <h1>My Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </AppScreen>
  );
};

export default MyPage;
