import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Agregamos un estado para el rol del usuario

  // Manejar autenticación
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Cargar pedidos
  useEffect(() => {
    if (userId) {
      setLoading(true);
      const q = query(collection(db, 'orders'), where('userId', '==', userId));
      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const fetchedOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
          setLoading(false);
        },
        error => {
          console.error('Error fetching orders: ', error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [userId]);

  // Cargar rol del usuario
  useEffect(() => {
    const fetchUserRole = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error('Error fetching user role: ', error);
        }
      }
    };

    fetchUserRole();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>No estás logueado. Por favor inicia sesión.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>¡Bienvenido, {auth.currentUser?.email}!</Text>
      <Text style={styles.subtitle}>Tu rol: {userRole || 'Cargando...'}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Ver Perfil"
          onPress={() => navigation.navigate('Profile')}
          color="#007BFF"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Nuevo Pedido"
          onPress={() => navigation.navigate('Orders')}
          color="#28A745"
        />
      </View>

      {userRole === 'admin' && (
        <View style={styles.buttonContainer}>
          <Button
            title="Gestión de Usuarios"
            onPress={() => navigation.navigate('Gestion')}
            color="#FFC107"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain', // Ajusta el logo proporcionalmente
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default HomeScreen;
