import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import StartPage from './screens/StartPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataEntry from './screens/DataEntry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthScreen"
        screenOptions={{
          headerShown: false, // Hide the header
        }}
      >
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="DataEntry" component={DataEntry} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <View>
//       <DataEntry/>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
