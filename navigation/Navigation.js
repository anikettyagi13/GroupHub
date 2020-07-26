import React, { useEffect, useState } from 'react';
import { Text, View,Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from '../component/home/Home'
import Profile from '../component/profile/Profile'
import Notification from '../component/notification/Notification'
import Login from '../component/login/Login'
import SignUp from '../component/signup/Signup'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Card,Item,Icon,Button } from 'native-base';
// import Firebase, { FirebaseProvider } from "./firebase/index";

const Stack = createStackNavigator();
const Root = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer  = createDrawerNavigator();

function insta({route,navigation}){
  var {link} = route.params;
  return(
    <Container style={{flex:1}}>
      <Header style={{backgroundColor:'#fff'}}>
        <Item style={{flex:1}}>
          <Button onPress={()=>navigation.goBack()} style={{alignItems:'flex-start'}}>
            <Icon name="arrow-back" style={{ color: "#285F80" }} />
          </Button>
        </Item>
      </Header>
      <Text style={{fontSize:50,marginHorizontal:130}}>{link}</Text>
    </Container>
    
  )
}

function HomeTabs(){
return(
  
  <Tab.Navigator
    tabBarOptions={{
      inactiveTintColor: 'gray',
    }}
    barStyle={{ backgroundColor: '#fff' }}
   

  >
    <Tab.Screen name="Home" component={HomeScreen}  
    options={{
      tabBarLabel: "Home",
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="home" color={color} size={26} />
      )
    }}/>
    <Tab.Screen name="Notification" component={Notification} 
    options={{
      // tabBarLabel: 'Notification',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
      ),
      tabBarBadge: true,
    }}
    />
    <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="account" color={color} size={26} />
      ),
    }}
  />
  </Tab.Navigator>
)
}

function MyStack (){
  return(
  <Stack.Navigator defaultNavigationOptions={{ gestureEnabled: false, headerLeft: null }}
  screenOptions={{ headerShown: false }} >
    <Stack.Screen name ='home' component={HomeTabs}></Stack.Screen>
    <Stack.Screen name='insta' component={insta}></Stack.Screen>
  </Stack.Navigator>
  )
}

export default function Navigation({firebase}) {
  const [user,setUser] = useState();
    useEffect(async()=>{
        var loggedIn = await firebase.auth().onAuthStateChanged();
        setUser(loggedIn);
    })
  return (
    <NavigationContainer>
    <Root.Navigator  defaultNavigationOptions={{ gestureEnabled: false, headerLeft: null }}
          screenOptions={{ headerShown: false }}>
    { user ? (
          <Root.Screen name='home' component={MyStack}></Root.Screen>
        ) : (
          <>
            <Root.Screen name="Login" component={Login} />
            <Root.Screen name="signUp" component={SignUp} />
          </>    
    )}
    </Root.Navigator>
    </NavigationContainer>
  );
}
