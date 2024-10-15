// src/screens/ServicesScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const services = [
  { id: '1', name: 'Dibujo de Planos', description: 'Elaboramos planos detallados para tus proyectos.' },
  { id: '2', name: 'Ploteo de Planos', description: 'Ploteamos tus planos con alta calidad y precisión.' },
  { id: '3', name: 'Revisión de Planos', description: 'Revisamos tus planos para asegurar su correcta ejecución.' },
];

const ServicesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios de LaZona</Text>
      <ScrollView>
        {services.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Button 
              title="Ver más"
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
            />
          </View>
        ))}
      </ScrollView>
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
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    marginVertical: 5,
    color: '#555',
  },
});

export default ServicesScreen;
