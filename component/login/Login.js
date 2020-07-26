import React, { useState,useEffect } from 'react';
import { Form, Item, Input, Button, Body, Text, Container, Header, Title,Label  } from 'native-base';
import { ToastAndroid } from 'react-native';
import{validEmail} from '../../usefull/validation'


export default function Login({navigation,firebase}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(async()=>{
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        })
    })

    const LoginPress=async()=>{
        try{

            const isEmail = validEmail(email);
            if(!isEmail){
                ToastAndroid.showWithGravity("Invalid email check again.",2000,ToastAndroid.BOTTOM);
                return;
            }

            else if(password.length<8){
                ToastAndroid.showWithGravity("Password cannot be smaller than 8",2000,ToastAndroid.BOTTOM);
            }

            
            const user = await firebase.login(email,password);
            if(user){
                navigation.navigate("home");
            }
        
        }catch(e){

            ToastAndroid.showWithGravity("Something went wrong. Please try again later.",2000,ToastAndroid.BOTTOM);
        
        }
    }
    const SignupClick =()=>{
        navigation.navigate("signUp")
    }
    return(
        <Container style={{flex:1}}>
        <Header style={{backgroundColor:'#fff'}}>
            <Body>
                <Title>Login</Title>
            </Body>
        </Header>
        <Form>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input 
                  name='email'
                  value={email}
                  onChangeText={text=>setEmail(text)}
                />
            </Item>
            
            <Item floatingLabel>
                <Label>Password</Label>
                <Input 
                  name='password'
                  value={password}
                  onChangeText={text=>setPassword(text)}
                />
            </Item>

            <Button transparent onPress={LoginPress}>
                <Text>Login</Text>
            </Button>
        </Form>
        <Text note> Don't have an account <Button transparent onPress={SignupClick}>SingUp</Button></Text>
        </Container>
    )
}