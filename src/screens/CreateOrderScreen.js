import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateOrderScreen = ({ navigation }) => {
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual

  const handleCreateOrder = async () => {
    if (!client || !description) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        client,
        description,
        status,
        date,
      });
      Alert.alert('Éxito', 'Pedido creado correctamente.');
      navigation.goBack(); // Regresa a la pantalla de pedidos
    } catch (error) {
      console.error('Error creando pedido: ', error);
      Alert.alert('Error', 'No se pudo crear el pedido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        value={client}
        onChangeText={setClient}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Crear Pedido" onPress={handleCreateOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});

export default CreateOrderScreen;
