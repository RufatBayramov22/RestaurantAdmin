import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabConfig from './src/navigation/tabs'; 
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="homeTab"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#090A0D',
        borderTopColor: '#1A1C20',
        height: 82,
        paddingTop: 8,
      },
      tabBarActiveTintColor: '#2E78F2',
      tabBarInactiveTintColor: '#B8B8B8',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    }}
  >
    {tabConfig.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? tab.iconActive : tab.icon}
              style={{ width: 24, height: 24 }}
            />
          ),
          tabBarLabel: tab.displayName,
        }}
      />
    ))}
  </Tab.Navigator>
);


export default HomeTabs;