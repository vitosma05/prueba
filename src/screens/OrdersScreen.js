// src/screens/OrdersScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrdersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Órdenes</Text>
      <View style={styles.order}>
        <Text>Orden #001: Dibujo de plano</Text>
        <Button title="Ver detalles" onPress={() => alert('Detalles de la orden #001')} />
      </View>
      <View style={styles.order}>
        <Text>Orden #002: Ploteo de plano</Text>
        <Button title="Ver detalles" onPress={() => alert('Detalles de la orden #002')} />
      </View>
      <View style={styles.order}>
        <Text>Orden #003: Dibujo de plano</Text>
        <Button title="Ver detalles" onPress={() => alert('Detalles de la orden #003')} />
      </View>
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
  order: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
  },
});

export default OrdersScreen;
