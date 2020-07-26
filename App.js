import React from 'react';
import Navigation from './navigation/Navigation'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase, { FirebaseProvider } from "./firebase/index";

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <Navigation />
    </FirebaseProvider>
  );
}

