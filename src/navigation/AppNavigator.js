// AppNavigator.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../firebaseConfig'; // Importa la configuración de Firebase
import HomeScreen from '../screens/HomeScreen';  
import OrdersScreen from '../screens/OrdersScreen';  
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ServicesScreen from '../screens/ServicesScreen';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileScreen from '../screens/ProfileScreen';  // Asegúrate de que la ruta sea correcta
import CreateOrderScreen from '../screens/CreateOrderScreen';
import EditOrderScreen from '../screens/EditOrderScreen';
import GestionScreen from '../screens/GestionScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true); // Usuario logueado
      } else {
        setIsLoggedIn(false); // Usuario no logueado
      }
      setLoading(false); // Cuando se termine de verificar el estado de autenticación, cambia loading
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
          <Stack.Screen name="EditOrder" component={EditOrderScreen} />
          <Stack.Screen name="Gestion" component={GestionScreen} />
          {/* Asegúrate de que Profile y Services estén definidas también */}
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Services" component={ServicesScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
