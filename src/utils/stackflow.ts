import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import MainPage from 'src/components/pages/MainPage';
import DetailPage from 'src/components/pages/DetailPage';
import LoginPage from 'src/components/pages/LoginPage';
import RegisterPage from 'src/components/pages/RegisterPage';
import MyPage from 'src/components/pages/MyPage';



export const { Stack, useFlow } = stackflow({
  transitionDuration: 350, // 설정 확인
  activities: {
    MainPage,
    DetailPage,
    LoginPage,
    RegisterPage,
    MyPage,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
      backgroundColor: '#212124',
    }),
  ],
  initialActivity: () => 'MainPage',
});
