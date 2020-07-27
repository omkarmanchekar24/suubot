import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

//Components
import {
  Login,
  SignIn,
  Otp,
  Welcome,
  Select,
  Stores,
  Products,
  Product2,
  Payment,
  Splash,
} from '../components';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar initial>
        <Scene key="splashScreen" hideNavBar initial>
          <Scene key="splash" component={Splash} hideNavBar initial />
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={Login} hideNavBar initial />
          <Scene key="signin" component={SignIn} hideNavBar />
          <Scene key="otp" component={Otp} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene key="welcome" component={Welcome} hideNavBar initial />
          <Scene key="select" component={Select} hideNavBar />
          <Scene key="stores" component={Stores} hideNavBar />
          <Scene key="products" component={Products} hideNavBar />
          <Scene key="product2" component={Product2} hideNavBar />
          <Scene key="payment" component={Payment} hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
