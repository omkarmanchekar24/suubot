import React from 'react';
import {ToastAndroid, BackHandler, Text} from 'react-native';
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';

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
  SellerWise,
  SellerWiseOrder,
  SwitchAccount,
  SellerWelcome,
  AddItems,
  RemoveItems,
  PendingOrders,
  Reviews,
  Message,
  EditProfile,
  SelectRole,
  EditStock,
  ProductUpdate,
  ItemWise,
  ItemWiseSeller,
  ClientWiseSeller,
  InventoryWiseSeller,
} from '../components';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{backgroundColor: '#546'}}>
      <Scene key="root" hideNavBar initial>
        <Scene key="splashScreen" hideNavBar initial>
          <Scene key="splash" component={Splash} hideNavBar initial />
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={Login} hideNavBar initial />
          <Scene key="signin" component={SignIn} hideNavBar />
          <Scene key="selectrole" component={SelectRole} hideNavBar />
          <Scene key="otp" component={Otp} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene key="welcome" component={Welcome} initial hideNavBar />
          <Scene key="select" component={Select} hideNavBar />
          <Scene key="stores" component={Stores} hideNavBar />
          <Scene key="products" component={Products} hideNavBar />
          <Scene key="product2" component={Product2} hideNavBar />
          <Scene key="payment" component={Payment} hideNavBar />
          <Scene key="sellerwise" component={SellerWise} hideNavBar />
          <Scene key="sellerwiseorder" component={SellerWiseOrder} hideNavBar />
          <Scene key="itemwise" component={ItemWise} hideNavBar />
        </Scene>
        <Scene key="seller">
          <Scene key="sellerwelcome" component={SellerWelcome} hideNavBar />
          <Scene key="additems" component={AddItems} hideNavBar />
          <Scene key="removeitems" component={RemoveItems} hideNavBar />
          <Scene key="pendingOrders" component={PendingOrders} hideNavBar />
          <Scene key="message" component={Message} hideNavBar />
          <Scene key="reviews" component={Reviews} hideNavBar />
          <Scene key="editProfile" component={EditProfile} hideNavBar />
          <Scene key="editstock" component={EditStock} hideNavBar />
          <Scene key="productUpdate" component={ProductUpdate} hideNavBar />
          <Scene key="itemwiseseller" component={ItemWiseSeller} hideNavBar />
          <Scene
            key="inventorywiseseller"
            component={InventoryWiseSeller}
            hideNavBar
          />
          <Scene
            key="clientwiseseller"
            component={ClientWiseSeller}
            hideNavBar
          />
        </Scene>
        <Scene key="switchPage">
          <Scene key="switchAccount" component={SwitchAccount} hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
