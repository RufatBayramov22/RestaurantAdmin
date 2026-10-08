// tabConfig.js
import Home from "../screens/home/Home";
import History from "../screens/history/History";
import QrScan from "../screens/qrscan/QrScan";
import Chat from "../screens/chat/Chat";
import Profile from "../screens/profile/Profile";

export default [
  {
    id: '1',
    displayName: 'Home',
    name: 'homeTab',
    icon: require('../assets/images/icon/home.png'),
    iconActive: require('../assets/images/icon/activeHome.png'),
    component: Home,
  },
  {
    id: '2',
    displayName: 'History',
    name: 'historyTab',
    icon: require('../assets/images/icon/history.png'),
    iconActive: require('../assets/images/icon/activeHistory.png'),
    component: History,
  },
  {
    id: '3',
    displayName: 'QR Scan',
    name: 'qrTab',
    icon: require('../assets/images/icon/scan.png'),
    iconActive: require('../assets/images/icon/activeScan.png'),
    component: QrScan,
  },
  {
    id: '4',
    displayName: 'Chat',
    name: 'chatTab',
    icon: require('../assets/images/icon/chatt.png'),
    iconActive: require('../assets/images/icon/activeChat.png'),
    component: Chat,
  },
  {
    id: '5',
    displayName: 'Profile',
    name: 'profileTab',
    icon: require('../assets/images/icon/profile.png'),
    iconActive: require('../assets/images/icon/activeProfile.png'),
    component: Profile,
  },
];
