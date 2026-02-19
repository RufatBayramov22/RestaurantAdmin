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
import RegisterSumbit from './src/screens/register/RegisterSumbit';
import GoSubscription from './src/screens/subscription/GoSubscription';
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
          <Stack.Screen name="RegisterDoc" component={RegisterDoc} />
          <Stack.Screen name="RegisterSumbit" component={RegisterSumbit} />
          <Stack.Screen name='GoSubscription' component={GoSubscription}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
          <Stack.Screen name="RegisterDoc" component={RegisterDoc} />
          <Stack.Screen name="RegisterSumbit" component={RegisterSumbit} />
          <Stack.Screen name='GoSubscription' component={GoSubscription}/>
        </>
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  const [authState, setAuthState] = useState<AuthState>('unauthenticated'); 

  return (
    <NavigationContainer>
      <MainNavigator authState={authState} />
      {/* <Toast /> */}
    </NavigationContainer>
  );
};

export default App;