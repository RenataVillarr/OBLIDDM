import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Importar Picker desde @react-native-picker/picker

const UpdateTipoMaquina = () => {
    const [tipoMaquina, setTipoMaquina] = useState('');
    const [image, setImage] = useState(null);

    const tiposDeMaquinas = [
        'Bicicleta Fija',
        'Prensa',
        'Caminadora',
        'Elíptica',
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleUpdate = () => {
        if (!tipoMaquina.trim()) {
            Alert.alert("El tipo de máquina es requerido");
            return;
        }

        console.log({
            tipoMaquina: tipoMaquina,
            image: image
        });

        setTipoMaquina('');
        setImage(null);

        Alert.alert('Tipo de máquina actualizado con éxito');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tipo de Máquina</Text>
            <Picker
                selectedValue={tipoMaquina}
                onValueChange={(itemValue) => setTipoMaquina(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Seleccione el tipo de máquina" value="" />
                {tiposDeMaquinas.map((tipo, index) => (
                    <Picker.Item key={index} label={tipo} value={tipo} />
                ))}
            </Picker>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Seleccionar Foto de Ejemplo</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Actualizar Tipo de Máquina" onPress={handleUpdate} />
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default UpdateTipoMaquina;
