import * as React from 'react';
import {Provider} from "react-redux";
import ReduxThunk from 'redux-thunk'
import {createStore,combineReducers,applyMiddleware} from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RoomScreen from "./screens/RoomScreen";
import RoomsReducer from "./reducers/RoomsReducer";
import {getCombinedStyles} from "react-native-paper";



const rootReducer = combineReducers({
    room:RoomsReducer,
})


const store= createStore(rootReducer,applyMiddleware(ReduxThunk))






const Stack = createNativeStackNavigator();


function App() {
  return (
      <Provider store={store}>


    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: '#6646ee'
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                  fontSize: 22
              }
          }}



      >

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
            name="Room"
            component={RoomScreen}
            options={({ route }) => ({
                title: route.params.thread
            })}
        />
      </Stack.Navigator>
    </NavigationContainer>
      </Provider>
  );
}

export default App;
