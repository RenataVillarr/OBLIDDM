import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterEjercicio = () => {
    const [ejercicioId, setEjercicioId] = useState('');
    const [nombre, setNombre] = useState('');
    const [tipoMaquina, setTipoMaquina] = useState('');
    const [video, setVideo] = useState('');

    const tiposDeMaquinas = [
        { label: 'Bicicleta Fija', value: 'Bicicleta Fija' },
        { label: 'Prensa', value: 'Prensa' },
        { label: 'Caminadora', value: 'Caminadora' },
        { label: 'Elíptica', value: 'Elíptica' },
    ];

    const handleRegister = () => {
        if (!ejercicioId.trim()) {
            Alert.alert("Ingrese el ID del ejercicio");
            return;
        }
        if (!nombre.trim()) {
            Alert.alert("Ingrese el nombre del ejercicio");
            return;
        }
        if (!tipoMaquina.trim()) {
            Alert.alert("Por favor, elija el tipo de máquina utilizada");
            return;
        }
        if (!video.trim()) {
            Alert.alert("Por favor, ingrese la URL del video demostrativo");
            return;
        }

        console.log({
            ejercicioId: ejercicioId,
            nombre: nombre,
            tipoMaquina: tipoMaquina,
            video: video,
        });

        Alert.alert("Éxito", "El ejercicio ha sido registrado correctamente");

        setEjercicioId('');
        setNombre('');
        setTipoMaquina('');
        setVideo('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Registro de Ejercicio</Text>
                <Text style={styles.label}>ID del Ejercicio</Text>
                <TextInput
                    style={styles.input}
                    value={ejercicioId}
                    onChangeText={setEjercicioId}
                    placeholder="Ingrese el ID del ejercicio"
                />
                <Text style={styles.label}>Nombre del Ejercicio</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ingrese el nombre del ejercicio"
                />
                <Text style={styles.label}>Tipo de Máquina Utilizada</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={tipoMaquina}
                        onValueChange={(itemValue) => setTipoMaquina(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione el tipo de máquina" value="" />
                        {tiposDeMaquinas.map((tipo, index) => (
                            <Picker.Item key={index} label={tipo.label} value={tipo.value} />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.label}>Video Demostrativo del Ejercicio</Text>
                <TextInput
                    style={styles.input}
                    value={video}
                    onChangeText={setVideo}
                    placeholder="Ingrese la URL del video demostrativo"
                />
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Registrar Ejercicio</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: '100%',
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default RegisterEjercicio;
