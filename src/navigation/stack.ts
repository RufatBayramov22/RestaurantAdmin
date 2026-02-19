import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import HomeTabs from '../../HomeTabs';
import Onboarding from '../screens/onboarding/Onboarding';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import RegisterDetails from '../screens/register/RegisterDetails';
import RegisterDoc from '../screens/register/RegisterDoc';
import RegisterSumbit from '../screens/register/RegisterSumbit';
import GoSubscription from '../screens/subscription/GoSubscription';

export type RootStackParamList = {
  Home: undefined;
  HomeTabs: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RegisterDetails: undefined;
  RegisterDoc: undefined;
  RegisterSumbit: undefined;
  GoSubscription: undefined;

};

export type RouteItem = {
  path: keyof RootStackParamList;
  component: any;
  private: boolean;
};
export type RouteProps = RouteProp<RootStackParamList>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export const RoutesStack: RouteItem[] = [
  {
    path: 'Home',
    component: Home,
    private: false,
  },
  {
    path: 'Onboarding',
    component: Onboarding,
    private: false,
  },
  {
    path: 'Login',
    component: Login,
    private: false,
  },
  {
    path: 'Register',
    component: Register,
    private: false,
  },
  {
    path: 'RegisterDetails',
    component: RegisterDetails,
    private: false,
  },
   {
    path: 'RegisterDoc',
    component: RegisterDoc,
    private: false,
  },
  {
    path: 'RegisterSumbit',
    component: RegisterSumbit,
    private: false,
  },
   {
    path: 'GoSubscription',
    component: GoSubscription,
    private: false,
  },

];
