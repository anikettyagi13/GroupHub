import React, { useState, useEffect } from 'react';
import { Form, Item, Input, Button, Container, Text, Header, Title, Body, Label } from 'native-base';
import { ToastAndroid } from 'react-native';
import { validEmail, validUsername } from '../../usefull/validation';


export default function Signup({navigation,firebase}){
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [cpassword,setCPassword] = useState("");
    const [password,setPassword] = useState("");

    useEffect(async()=>{
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        })
    })


    const SignupPress=async()=>{
        try{

            const isEmail = validEmail(email);
            if(!isEmail){
                ToastAndroid.showWithGravity("Invalid email check again.",2000,ToastAndroid.BOTTOM);
                return;
            }
            const isUsername = validUsername(username);
            if(!isUsername){
                ToastAndroid.showWithGravity("Username can only contain lower-case alphabets, numbers and ' . - _ '",2000,ToastAndroid.BOTTOM);
                return;
            }
            // const canUseUsername = firebase.checkUsername(username);
            // if(!canUseUsername){
            //     ToastAndroid.showWithGravity("Username not available",2000,ToastAndroid.BOTTOM);
            //     return;
            // }
            if(password.length<8){
                ToastAndroid.showWithGravity("Password should be of 8 characters",2000,ToastAndroid.BOTTOM);
            }
            else if(cpassword!=password){
                ToastAndroid.showWithGravity("Confirm password and password do not match",2000,ToastAndroid.BOTTOM);
            }
            if(isUsername&&isEmail){
                const user = await firebase.signup(email,password,username);
                if(user){
                    navigation.navigate("home");
                }
            }
        
        }catch(e){

            ToastAndroid.showWithGravity("Something went wrong. Please try again later.",2000,ToastAndroid.BOTTOM);
        
        }
    }
    const LoginClick=()=>{
        navigation.navigate("Login");
    }
    return(
        <Container style={{flex:1}}>
        <Header style={{backgroundColor:'#fff'}}>
        <Body>
            <Title>SignUp</Title>
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
                <Label>Username</Label>
                <Input 
                  name='username'
                  value={username}
                  onChangeText={text=>setUsername(text)}
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

            <Item floatingLabel>
                <Label>Confirm Password</Label>
                <Input 
                  name='cpassword'
                  value={cpassword}
                  onChangeText={text=>setCPassword(text)}
                />
            </Item>

            <Button transparent onPress={SignupPress}>
                <Text>Signup</Text>
            </Button>
            <Text note>
                Want to login? click here <Button transparent onPress={LoginClick}><Text note>Login</Text></Button>
            </Text>
        </Form>
        </Container>
    )
}