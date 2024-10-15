// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <View style={styles.profileInfo}>
        <Text>Nombre: Juan Pérez</Text>
        <Text>Email: juan.perez@example.com</Text>
        <Text>Teléfono: +54 9 123 456 789</Text>
      </View>
      <Button title="Cerrar sesión" onPress={() => navigation.goBack()} />
      <Button title="Volver a Inicio" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default ProfileScreen;
