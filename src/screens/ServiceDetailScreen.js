// src/screens/ServiceDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params;

  // Aquí puedes reemplazar los datos con una llamada a la API o base de datos para obtener más detalles
  const serviceDetails = {
    '1': { name: 'Dibujo de Planos', description: 'Elaboramos planos detallados para tus proyectos. Incluye diseño arquitectónico y estructural.' },
    '2': { name: 'Ploteo de Planos', description: 'Ploteamos tus planos en varios tamaños y formatos para presentación o construcción.' },
    '3': { name: 'Revisión de Planos', description: 'Revisamos tus planos para garantizar su precisión y viabilidad.' },
  };

  const service = serviceDetails[serviceId];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Button 
        title="Contratar Servicio"
        onPress={() => navigation.navigate('Order')}
      />
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
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});

export default ServiceDetailScreen;
