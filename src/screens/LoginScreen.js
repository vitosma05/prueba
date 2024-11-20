import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email inválido').required('Requerido'),
          password: Yup.string().required('Requerido'),
        })}
        onSubmit={async (values) => {
          setLoading(true); // Muestra el indicador de carga
          try {
            // Intento de login
            await signInWithEmailAndPassword(auth, values.email, values.password);
            Alert.alert('Login exitoso', 'Bienvenido a la aplicación');
            navigation.navigate('Home'); // Redirige a Home después del login exitoso
          } catch (error) {
            // Si ocurre un error en el login, muestra el mensaje
            Alert.alert('Error de autenticación', error.message);
          } finally {
            setLoading(false); // Oculta el indicador de carga
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

            <Text>Contraseña</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carga
            ) : (
              <Button onPress={handleSubmit} title="Iniciar sesión" />
            )}

            {/* Botón para ir al registro */}
            <Button
              onPress={() => navigation.navigate('Register')}
              title="Crear cuenta"
              color="blue"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
