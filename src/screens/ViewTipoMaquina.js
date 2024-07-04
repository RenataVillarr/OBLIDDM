import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import MySingleButton from '../components/MySingleButton';

const ViewAllTipoMaquina = ({ navigation }) => {
  const [tiposMaquina, setTiposMaquina] = useState([]);

  useEffect(() => {
    const fetchTiposMaquina = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const tiposMaquinaList = result.map(req => JSON.parse(req[1])).filter(item => item && item.codigoIdentificador); // Filtrar solo los tipos con código identificador
        setTiposMaquina(tiposMaquinaList);
      } catch (error) {
        console.error('Error al cargar tipos de máquinas:', error);
        Alert.alert(
          'Error',
          'Hubo un problema al cargar los tipos de máquinas.',
          [{ text: 'OK' }]
        );
      }
    };
    fetchTiposMaquina();
  }, []);

  const handleDelete = async (codigoIdentificador) => {
    try {
      await AsyncStorage.removeItem(codigoIdentificador);
      setTiposMaquina(tiposMaquina.filter(item => item.codigoIdentificador !== codigoIdentificador));
      Alert.alert(
        'Confirmación',
        'El tipo de máquina ha sido eliminado con éxito.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error al eliminar el tipo de máquina:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al eliminar el tipo de máquina.',
        [{ text: 'OK' }]
      );
    }
  };

  const listItemView = ({ item }) => {
    return (
      <View key={item.codigoIdentificador} style={styles.listItemView}>
        <MyText text={`Código Identificador: ${item.codigoIdentificador}`} style={styles.text} />
        <MySingleButton title="Eliminar" customPress={() => handleDelete(item.codigoIdentificador)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={tiposMaquina}
        keyExtractor={(item) => item.codigoIdentificador.toString()}
        renderItem={listItemView}
        ListEmptyComponent={<Text>No hay tipos de máquinas registrados.</Text>}
      />
    </SafeAreaView>
  );
};

export default ViewAllTipoMaquina;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItemView: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
