import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import home from './components/home/home';
import graphic from './components/graphic/graphic';
import history from './components/history/history';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="History" component={history} />
        <Stack.Screen name="Graphic" component={graphic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
