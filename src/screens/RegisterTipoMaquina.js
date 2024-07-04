import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterTipoMaquina = () => {
  const [tipomaquina, setTipoMaquina] = useState('');
  const [codigoIdentificador, setCodigoIdentificador] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (tipomaquina.trim() === '' || codigoIdentificador.trim() === '') {
      setErrorMessage('Por favor ingrese todos los datos requeridos.');
      return;
    }

    const data = {
      tipoMaquina: tipomaquina,
      codigoIdentificador: codigoIdentificador,
    };

    try {
      await AsyncStorage.setItem(codigoIdentificador, JSON.stringify(data));
      setTipoMaquina('');
      setCodigoIdentificador('');
      setErrorMessage('');

      Alert.alert(
        'Registro exitoso',
        'El tipo de máquina ha sido registrado con éxito.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error al registrar el tipo de máquina:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al registrar el tipo de máquina.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderImage = () => {
    switch (tipomaquina.toLowerCase()) {
      case 'bicicleta fija':
        return 'https://f.fcdn.app/imgs/a7e85a/albanes.com.uy/albauy/1b44/original/catalogo/45067_45067_1/2000-2000/bicicleta-spinning-bravo-comp-unica.jpg';
      case 'prensa':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72vEhgXj8w01VNzZ44h5dkQnhAaozCweW3A&s';
      case 'caminadora':
        return 'https://ss206.liverpool.com.mx/xl/1109400943.jpg';
      case 'eliptica':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKa3Bg8aLYPLL_dlkqbsMBkFuCjyTHoI4q_w&s';
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Máquina</Text>
      <Text style={styles.label}>Opciones: bicicleta fija, prensa, caminadora, eliptica</Text>
      <TextInput
        style={styles.input}
        value={tipomaquina}
        onChangeText={setTipoMaquina}
        placeholder="Ingrese el tipo de máquina"
      />
      <TextInput
        style={styles.input}
        value={codigoIdentificador}
        onChangeText={setCodigoIdentificador}
        placeholder="Ingrese el código de identificación"
      />
      {renderImage() && <Image source={{ uri: renderImage() }} style={styles.image} />}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Registrar Tipo de Máquina" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterTipoMaquina;
