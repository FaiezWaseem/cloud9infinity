import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadFile from "./src/screen/UploadFile";
import Login from "./src/screen/Auth"
import Home from "./src/screen/Home"
import Videoplayer from "./src/screen/VideoPlayer"
import Splash from "./src/screen/Splash"
import EditProfile from "./src/screen/EditProfile"
const Stack = createNativeStackNavigator();
export default function Route(){
    return <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="UploadFile" component={UploadFile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
        <Stack.Screen name="Videoplayer" component={Videoplayer} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
}