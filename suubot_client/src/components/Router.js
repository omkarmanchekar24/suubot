import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

//Components
import {SignIn} from '../components';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="signin" component={SignIn} title="SUUBOT" initial />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
