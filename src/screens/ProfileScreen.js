import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login'); // Redirige a la pantalla de login después del cierre de sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Text style={styles.email}>{auth.currentUser?.email}</Text>
      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        color="#FF0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
});

export default ProfileScreen;
