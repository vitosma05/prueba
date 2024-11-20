import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const EditOrderScreen = ({ route, navigation }) => {
  const { order } = route.params; // Recibimos el pedido seleccionado
  const [client, setClient] = useState(order.client);
  const [description, setDescription] = useState(order.description);
  const [status] = useState(order.status); // Eliminamos setStatus para que no pueda ser editado
  const [date, setDate] = useState(order.date);

  const handleUpdateOrder = async () => {
    if (!client || !description || !date) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const orderRef = doc(db, 'orders', order.id); // Referencia al documento
      await updateDoc(orderRef, {
        client,
        description,
        status, // El estado sigue siendo parte de la actualización, pero no editable
        date,
      });
      Alert.alert('Éxito', 'Pedido actualizado correctamente.');
      navigation.goBack(); // Regresa a la lista de pedidos
    } catch (error) {
      console.error('Error actualizando pedido: ', error);
      Alert.alert('Error', 'No se pudo actualizar el pedido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Pedido</Text>
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
      <View style={styles.input}>
        <Text style={{ color: '#333' }}>Estado: {status}</Text> {/* Mostramos el estado sin permitir edición */}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Guardar Cambios" onPress={handleUpdateOrder} />
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

export default EditOrderScreen;
