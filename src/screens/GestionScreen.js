import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const GestionScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAdminRole = async () => {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const snapshot = await onSnapshot(userDoc, (doc) => {
        if (doc.exists() && doc.data().role !== 'admin') {
          Alert.alert('Acceso denegado', 'No tienes permisos para acceder a esta sección.');
          navigation.goBack();
        }
      });
    };

    checkAdminRole();

    // Cargar todos los pedidos
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderDoc = doc(db, 'orders', orderId);
      await updateDoc(orderDoc, { status: newStatus });
      Alert.alert('Éxito', 'Estado actualizado correctamente.');
    } catch (error) {
      console.error('Error actualizando el estado:', error);
      Alert.alert('Error', 'Hubo un problema actualizando el estado.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, 'orders', orderId);
      await deleteDoc(orderDoc);
      Alert.alert('Éxito', 'Pedido eliminado correctamente.');
    } catch (error) {
      console.error('Error eliminando el pedido:', error);
      Alert.alert('Error', 'Hubo un problema eliminando el pedido.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.client}>Cliente: {item.client}</Text>
            <Text>Descripción: {item.description}</Text>
            <Text>Estado: {item.status}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Marcar como Completado"
                onPress={() => handleStatusChange(item.id, 'Completado')}
                color="#28A745"
              />
              <Button
                title="Eliminar"
                onPress={() => handleDeleteOrder(item.id)}
                color="#DC3545"
              />
            </View>
          </View>
        )}
      />
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
  orderItem: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  client: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GestionScreen;
