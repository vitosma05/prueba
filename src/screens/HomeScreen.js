// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido a LaZona!</Text>
      <Text style={styles.subtitle}>Ofrecemos servicios de dibujo y ploteo de planos para tus proyectos.</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Ver Servicios"
          onPress={() => navigation.navigate('Services')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Mis Pedidos"
          onPress={() => navigation.navigate('Orders')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Mi Perfil"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default HomeScreen;
