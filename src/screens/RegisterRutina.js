import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MySingleButton from "../components/MySingleButton";
import MyInputText from "../components/MyInputText";
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterRutina = ({ navigation }) => {
    const [rutinaId, setRutinaId] = useState('');
    const [userName, setUserName] = useState('');
    const [ejercicioId, setEjercicioId] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const dia = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const usuariosList = result.map(req => JSON.parse(req[1]));
                if (usuariosList.length > 0) {
                    setUsuarios(usuariosList);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "Aún no se tienen datos de usuarios",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar usuarios");
            }
        };
        fetchUsuarios();
    }, [navigation]);

    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const ejerciciosList = result.map(req => JSON.parse(req[1]));
                if (ejerciciosList.length > 0) {
                    setEjercicios(ejerciciosList);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "Aún no se tienen datos de ejercicios",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar ejercicios");
            }
        };
        fetchEjercicios();
    }, [navigation]);

    const clearData = () => {
        setRutinaId("");
        setUserName("");
        setEjercicioId("");
        setTiempo("");
        setCantidad("");
    }

    const registerRutina = async () => {
        console.log("states", rutinaId, userName, ejercicioId, tiempo, cantidad);
        if (!rutinaId.trim()) {
            Alert.alert("Ingrese el ID de la rutina");
            return;
        }
        if (!userName.trim()) {
            Alert.alert("Ingrese el nombre de usuario");
            return;
        }
        if (!ejercicioId.trim()) {
            Alert.alert("Ingrese el ID del ejercicio");
            return;
        }
        if (!tiempo.trim()) {
            Alert.alert("Ingrese el tiempo en minutos de la rutina");
            return;
        }
        if (!cantidad.trim()) {
            Alert.alert("Ingrese la cantidad de repeticiones");
            return;
        }

        try {
            const existingRutina = await AsyncStorage.getItem(rutinaId);
            if (existingRutina !== null) {
                Alert.alert("ID de la rutina ya utilizado");
                return;
            } let prefijo = "r"+ rutinaId;
            const rutina = { prefijo, dia: selectedDay, userName, ejercicioId, tiempo, cantidad };
            await AsyncStorage.setItem(rutinaId, JSON.stringify(rutina));
            clearData();
            Alert.alert(
                "Éxito",
                "Rutina registrada",
                [{ text: "OK", onPress: () => navigation.navigate("HomeRutina") }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert("Error al registrar la rutina.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <Text style={styles.subtitle}>ID de la rutina:</Text>
                            <MyInputText
                                onChangeText={setRutinaId}
                                style={styles.input}
                                value={rutinaId}
                            />
                            <Text style={styles.subtitle}>Día de la semana:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedDay}
                                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                            >
                                {dia.map((day) => (
                                    <Picker.Item label={day} value={day} key={day} />
                                ))}
                            </Picker>

                            <Text style={styles.subtitle}>Nombre de usuario:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={userName}
                                onValueChange={(itemValue) => setUserName(itemValue)}
                            >
                                <Picker.Item label="Seleccione un usuario" value="" />
                                {usuarios.map((usuario) => (
                                    <Picker.Item label={usuario.userName} value={usuario.userName} key={usuario.userName}/>
                                ))}
                            </Picker>
                            <Text style={styles.subtitle}>Ejercicio:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={ejercicioId}
                                onValueChange={(itemValue) => setEjercicioId(itemValue)}
                            >
                                <Picker.Item label="Seleccione un ejercicio" value="" />
                                {ejercicios.map((ejercicio) => (
                                    <Picker.Item label={ejercicio.name} value={ejercicio.name} key={ejercicio.name}/>
                                ))}
                            </Picker>
                            <Text style={styles.subtitle}>Tiempo en minutos:</Text>
                            <MyInputText
                                onChangeText={setTiempo}
                                style={styles.input}
                                value={tiempo}
                            />
                            <Text style={styles.subtitle}>Cantidad de repeticiones:</Text>
                            <MyInputText
                                onChangeText={setCantidad}
                                style={styles.input}
                                value={cantidad}
                            />
                            <MySingleButton
                                title="Guardar Rutina"
                                customPress={registerRutina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterRutina;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    generalView: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    input: {
        padding: 15,
        textAlignVertical: 'top',
    },
    subtitle: {
        fontSize: 13,
        color: '#333',
        marginBottom: -4,
        marginTop: 8,
        marginLeft: 29,
    },
    picker: {
        size: 13,
        marginTop: 0,
    }
});