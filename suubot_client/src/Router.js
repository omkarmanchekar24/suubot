import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

//Components
import {SignIn, Otp, Welcome, Select} from '../src/components';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" initial>
          <Scene key="signin" component={SignIn} hideNavBar initial />
          <Scene key="otp" component={Otp} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene key="welcome" component={Welcome} hideNavBar initial />
          <Scene key="select" component={Select} hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
