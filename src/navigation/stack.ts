import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import HomeTabs from '../../HomeTabs';
import Onboarding from '../screens/onboarding/Onboarding';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import RegisterDetails from '../screens/register/RegisterDetails';
import RegisterDoc from '../screens/register/RegisterDoc';
import RegisterMapPicker from '../screens/register/RegisterMapPicker';
import RegisterSumbit from '../screens/register/RegisterSumbit';
import GoSubscription from '../screens/subscription/GoSubscription';
import ChatDetail from '../screens/chat/ChatDetail';
import RestaurantDetails from '../screens/profile/restaurant-details/RestaurantDetails';
import RestaurantDetailsMapPicker from '../screens/profile/restaurant-details/RestaurantDetailsMapPicker.tsx';
import MediaSettings from '../screens/profile/media-settings/MediaSettings';
import Announcements from '../screens/profile/announcements/Announcements';
import EditAnnouncement from '../screens/profile/announcements/EditAnnouncement';
import MenuSettings from '../screens/profile/menu-settings/MenuSettings';
import NewMenuItem from '../screens/profile/menu-settings/NewMenuItem';
import AccountSettings from '../screens/profile/account-settings/AccountSettings';
import PersonalInfo from '../screens/profile/account-settings/PersonalInfo';
import ChangePassword from '../screens/profile/account-settings/ChangePassword';
import DeactivateAccount from '../screens/profile/deactivate-account/DeactivateAccount';
import { AnnouncementItem } from '../services/announcements';
import { MenuItem } from '../services/menuSettings';

export type RootStackParamList = {
  Home: undefined;
  HomeTabs: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RegisterDetails: undefined;
  RegisterDoc: undefined;
  RegisterMapPicker: undefined;
  RegisterSumbit: undefined;
  GoSubscription: undefined;
  MediaSettings: undefined;
  Announcements: undefined;
  EditAnnouncement: { announcement?: AnnouncementItem } | undefined;
  MenuSettings: undefined;
  NewMenuItem: { menuItem?: MenuItem } | undefined;
  AccountSettings: undefined;
  PersonalInfo: undefined;
  ChangePassword: undefined;
  DeactivateAccount: undefined;
  RestaurantDetails:
    | {
        selectedAddress?: string;
        selectedLatitude?: number;
        selectedLongitude?: number;
      }
    | undefined;
  RestaurantDetailsMapPicker: undefined;
  ChatDetail: {
    guestName: string;
    partnerUserId?: number;
    partnerRestaurantId?: number;
    avatarUrl?: string;
    avatarSource?: any;
  };

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
    path: 'RegisterMapPicker',
    component: RegisterMapPicker,
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
  {
    path: 'MediaSettings',
    component: MediaSettings,
    private: false,
  },
  {
    path: 'Announcements',
    component: Announcements,
    private: false,
  },
  {
    path: 'EditAnnouncement',
    component: EditAnnouncement,
    private: false,
  },
  {
    path: 'MenuSettings',
    component: MenuSettings,
    private: false,
  },
  {
    path: 'NewMenuItem',
    component: NewMenuItem,
    private: false,
  },
  {
    path: 'AccountSettings',
    component: AccountSettings,
    private: false,
  },
  {
    path: 'PersonalInfo',
    component: PersonalInfo,
    private: false,
  },
  {
    path: 'ChangePassword',
    component: ChangePassword,
    private: false,
  },
  {
    path: 'DeactivateAccount',
    component: DeactivateAccount,
    private: false,
  },
  {
    path: 'RestaurantDetails',
    component: RestaurantDetails,
    private: false,
  },
  {
    path: 'RestaurantDetailsMapPicker',
    component: RestaurantDetailsMapPicker,
    private: false,
  },
  {
    path: 'ChatDetail',
    component: ChatDetail,
    private: false,
  },

];
