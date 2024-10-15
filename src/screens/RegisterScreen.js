import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterScreen = () => {
  const navigation = useNavigation();

  // Estado para manejar la carga (loading)
  const [loading, setLoading] = useState(false);

  // Validación con Yup para el formulario
  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es requerido'),
    email: Yup.string().email('Correo no válido').required('El correo es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  });

  // Función que manejará el registro de usuario
  const handleRegister = (values) => {
    console.log('Formulario enviado con los valores:', values); // Esto nos ayudará a ver si los valores llegan correctamente

    setLoading(true);  // Activamos el estado de carga

    // Simulamos el proceso de registro
    setTimeout(() => {
      setLoading(false); // Terminamos el estado de carga
      
      // Aquí validamos el registro, si es exitoso, mostramos una alerta
      Alert.alert('Registro Exitoso', 'Ahora puedes iniciar sesión.');
      
      // Redirigimos a la pantalla Home
      navigation.navigate('Home');
    }, 2000); // 2 segundos para simular el proceso
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Crear Cuenta</Text>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Submitting form values:', values); // Esto nos ayuda a confirmar si los valores se envían
          handleRegister(values);  // Pasamos los valores al manejador de registro
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
              placeholder="Nombre de usuario"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username ? <Text style={{ color: 'red' }}>{errors.username}</Text> : null}

            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
              placeholder="Correo electrónico"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}

            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}

            <Button
              title={loading ? 'Cargando...' : 'Crear Cuenta'}
              onPress={handleSubmit}  // Aseguramos que se ejecute el `handleSubmit`
              disabled={loading}  // Deshabilitamos el botón mientras cargamos
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
