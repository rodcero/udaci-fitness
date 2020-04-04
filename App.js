import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import History from './components/History';
import EntryDetail from './components/EntryDetail';
import AddEntry from './components/AddEntry';
import reducer from './reducers';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: 40 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfig = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
    },
  },
};
const TabNavConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const TabNav = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={History} />
    <Tab.Screen name="Settings" component={AddEntry} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNav} />
            <Stack.Screen name="EntryDetail" component={EntryDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
