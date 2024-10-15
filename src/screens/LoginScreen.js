import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es requerida'),
  });

  const handleLogin = (values) => {
    console.log('Datos del formulario:', values);
    setLoading(true); // Activamos el estado de carga

    // Simulamos el proceso de autenticación
    setTimeout(() => {
      setLoading(false); // Desactivamos el estado de carga
      if (values.email === 'test@example.com' && values.password === '123456') {
        // Si el login es exitoso, navegamos a la pantalla de inicio
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        navigation.navigate('Home'); // Redirige al usuario al Home
      } else {
        // Si hay un error en el login, mostramos un alerta
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    }, 2000); // Simula un proceso de autenticación de 2 segundos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button
              onPress={handleSubmit}
              title={loading ? 'Cargando...' : 'Iniciar Sesión'}
              disabled={loading} // Deshabilitamos el botón mientras está cargando
            />

            <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
              Crear una cuenta nueva
            </Text>
          </>
        )}
      </Formik>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});

export default LoginScreen;
