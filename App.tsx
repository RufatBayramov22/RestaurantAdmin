import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Toast from 'react-native-toast-message';
import { RootStackParamList, RouteItem, RoutesStack } from './src/navigation/stack'; 
import HomeTabs from './HomeTabs'; 
import Onboarding from './src/screens/onboarding/Onboarding';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import RegisterDetails from './src/screens/register/RegisterDetails';
import RegisterDoc from './src/screens/register/RegisterDoc';
import RegisterMapPicker from './src/screens/register/RegisterMapPicker';
import RegisterSumbit from './src/screens/register/RegisterSumbit';
import GoSubscription from './src/screens/subscription/GoSubscription';
import ChatDetail from './src/screens/chat/ChatDetail';
import RestaurantDetails from './src/screens/profile/restaurant-details/RestaurantDetails';
import RestaurantDetailsMapPicker from './src/screens/profile/restaurant-details/RestaurantDetailsMapPicker';
import MediaSettings from './src/screens/profile/media-settings/MediaSettings';
import Announcements from './src/screens/profile/announcements/Announcements';
import EditAnnouncement from './src/screens/profile/announcements/EditAnnouncement';
import MenuSettings from './src/screens/profile/menu-settings/MenuSettings';
import NewMenuItem from './src/screens/profile/menu-settings/NewMenuItem';
import AccountSettings from './src/screens/profile/account-settings/AccountSettings';
import PersonalInfo from './src/screens/profile/account-settings/PersonalInfo';
import ChangePassword from './src/screens/profile/account-settings/ChangePassword';
import DeactivateAccount from './src/screens/profile/deactivate-account/DeactivateAccount';
import { MainProvider } from './src/context/MainContext';
// import Login from './src/screens/login/Login';
// import Register from './src/screens/register/Register';
// import Onboarding from './src/screens/onboarding/Onboarding';

const Stack = createStackNavigator<RootStackParamList>();
enableScreens();

type AuthState = 'unauthenticated' | 'registered' | 'authenticated';


function MainNavigator({ authState }: { authState: AuthState }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState === 'authenticated' ? (
        <>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          {RoutesStack.map((route: RouteItem) => (
            <Stack.Screen
              key={route.path}
              name={route.path}
              component={route.component}
            />
          ))}
        </>
      ) : authState === 'registered' ? (
        <>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
          <Stack.Screen name="RegisterDoc" component={RegisterDoc} />
          <Stack.Screen name="RegisterMapPicker" component={RegisterMapPicker} />
          <Stack.Screen name="RegisterSumbit" component={RegisterSumbit} />
          <Stack.Screen name='GoSubscription' component={GoSubscription}/>
          <Stack.Screen name="MediaSettings" component={MediaSettings} />
          <Stack.Screen name="Announcements" component={Announcements} />
          <Stack.Screen name="EditAnnouncement" component={EditAnnouncement} />
          <Stack.Screen name="MenuSettings" component={MenuSettings} />
          <Stack.Screen name="NewMenuItem" component={NewMenuItem} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="DeactivateAccount" component={DeactivateAccount} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
          <Stack.Screen name="RestaurantDetailsMapPicker" component={RestaurantDetailsMapPicker} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
          <Stack.Screen name="RegisterDoc" component={RegisterDoc} />
          <Stack.Screen name="RegisterMapPicker" component={RegisterMapPicker} />
          <Stack.Screen name="RegisterSumbit" component={RegisterSumbit} />
          <Stack.Screen name='GoSubscription' component={GoSubscription}/>
          <Stack.Screen name="MediaSettings" component={MediaSettings} />
          <Stack.Screen name="Announcements" component={Announcements} />
          <Stack.Screen name="EditAnnouncement" component={EditAnnouncement} />
          <Stack.Screen name="MenuSettings" component={MenuSettings} />
          <Stack.Screen name="NewMenuItem" component={NewMenuItem} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="DeactivateAccount" component={DeactivateAccount} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
          <Stack.Screen name="RestaurantDetailsMapPicker" component={RestaurantDetailsMapPicker} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
        </>
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  const [authState, setAuthState] = useState<AuthState>('unauthenticated'); 

  return (
    <MainProvider>
      <NavigationContainer>
        <MainNavigator authState={authState} />
        {/* <Toast /> */}
      </NavigationContainer>
    </MainProvider>
  );
};

export default App;