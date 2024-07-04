import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterMaquina = () => {
    const [codigo, setCodigo] = useState('');
    const [tipoMaquina, setTipoMaquina] = useState('');
    const [sala, setSala] = useState('');

    const tiposDeMaquinas = [
        'Bicicleta Fija',
        'Prensa',
        'Caminadora',
        'Elíptica',
    ];

    const handleRegister = () => {
        if (!codigo.trim()) {
            Alert.alert("Ingrese el Código de la Máquina");
            return;
        }
        if (!tipoMaquina.trim()) {
            Alert.alert("Por favor, elija el tipo de máquina");
            return;
        }
        if (!sala.trim()) {
            Alert.alert("Por favor, ingrese el número de sala");
            return;
        }

        console.log({
            codigo: codigo,
            tipoMaquina: tipoMaquina,
            sala: sala,
        });

        setCodigo('');
        setTipoMaquina('');
        setSala('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Registro de Máquina</Text>
                <Text style={styles.label}>Código Identificatorio</Text>
                <TextInput
                    style={styles.input}
                    value={codigo}
                    onChangeText={setCodigo}
                    placeholder="Ingrese el código"
                />
                <Text style={styles.label}>Tipo de Máquina</Text>
                <View style={styles.pickerContainer}>
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
                </View>
                <Text style={styles.label}>Número de Sala</Text>
                <TextInput
                    style={styles.input}
                    value={sala}
                    onChangeText={setSala}
                    placeholder="Ingrese el número de sala"
                />
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Registrar Máquina</Text>
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

export default RegisterMaquina;
