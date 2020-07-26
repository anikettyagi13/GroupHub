import React, { useEffect } from 'react'
import {View,Text} from 'react-native'
import { withFirebaseHOC } from "../../firebase/index";

function HomeScreen({navigation,firebase}) {
  useEffect(()=>{
    firebase.yo();
  })
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
}
export default  withFirebaseHOC(HomeScreen)