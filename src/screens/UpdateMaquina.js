import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete

const UpdateMaquina = () => {
    const [codigo, setCodigo] = useState('');
    const [tipoMaquina, setTipoMaquina] = useState('');
    const [sala, setSala] = useState('');
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
        if (!codigo.trim()) {
            Alert.alert("El código identificatorio es requerido");
            return;
        }
        if (!tipoMaquina.trim()) {
            Alert.alert("El tipo de máquina es requerido");
            return;
        }
        if (!sala.trim()) {
            Alert.alert("El número de sala es requerido");
            return;
        }

        console.log({
            codigo: codigo,
            tipoMaquina: tipoMaquina,
            sala: sala,
            image: image
        });

        // Reiniciar los estados después de la actualización
        setCodigo('');
        setTipoMaquina('');
        setSala('');
        setImage(null);

        Alert.alert('Máquina actualizada con éxito');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Código Identificatorio</Text>
            <TextInput
                style={styles.input}
                value={codigo}
                onChangeText={setCodigo}
                placeholder="Ingrese el código identificatorio"
            />
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
            <Text style={styles.label}>Número de Sala</Text>
            <TextInput
                style={styles.input}
                value={sala}
                onChangeText={setSala}
                placeholder="Ingrese el número de sala"
            />
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Seleccionar Foto de la Máquina</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Actualizar Máquina" onPress={handleUpdate} />
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

export default UpdateMaquina;
