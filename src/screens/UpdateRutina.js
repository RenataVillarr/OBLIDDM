import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MySingleButton from "../components/MySingleButton";
import MyInputText from "../components/MyInputText";
import { Text, Picker } from 'react-native';

const UpdateRutina = ({ route, navigation }) => {
    const { rutinaId } = route.params; //  el ID de la rutina desde los parámetros de navegación
    const [userName, setUserName] = useState('');
    const [ejercicioId, setEjercicioId] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
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

    useEffect(() => {
        const loadRutinaData = async () => {
            try {
                const rutinaData = await AsyncStorage.getItem(rutinaId);
                if (rutinaData !== null) {
                    const { userName, ejercicioId, tiempo, cantidad, selectedDay } = JSON.parse(rutinaData);
                    setUserName(userName);
                    setEjercicioId(ejercicioId);
                    setTiempo(tiempo);
                    setCantidad(cantidad);
                    setSelectedDay(selectedDay);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No se encontró la rutina solicitada",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeRutina") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar la rutina");
            }
        };
        loadRutinaData();
    }, [rutinaId, navigation]);

    const clearData = () => {
        setUserName("");
        setEjercicioId("");
        setTiempo("");
        setCantidad("");
        setSelectedDay('');
    };

    const updateRutina = async () => {
        if (!userName.trim() || !ejercicioId.trim() || !tiempo.trim() || !cantidad.trim() || !selectedDay.trim()) {
            Alert.alert("Todos los campos son obligatorios");
            return;
        }

        try {
            // Verificar si la rutina existe antes de actualizar
            const existingRutina = await AsyncStorage.getItem(rutinaId);
            if (existingRutina === null) {
                Alert.alert("La rutina no existe");
                return;
            }

            // Suponiendo que 'name' es el campo que contiene el nombre del ejercicio en el objeto ejercicios
            const selectedEjercicio = ejercicios.find(ejercicio => ejercicio.name === ejercicioId);
            if (!selectedEjercicio) {
                Alert.alert("Ejercicio no encontrado");
                return;
            }

            const updatedRutina = { rutinaId, userName, ejercicioId, tiempo, cantidad, selectedDay };
            await AsyncStorage.setItem(rutinaId, JSON.stringify(updatedRutina));
            clearData();
            Alert.alert(
                "Éxito",
                "Rutina actualizada",
                [{ text: "OK", onPress: () => navigation.navigate("HomeRutina") }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar la rutina.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <ScrollView>
                    <KeyboardAvoidingView style={styles.keyboardView}>
                        <Text style={styles.subtitle}>Nombre de usuario:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={userName}
                            onValueChange={(itemValue) => setUserName(itemValue)}
                        >
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
                        <Text style={styles.subtitle}>Día de la semana:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedDay}
                            onValueChange={(itemValue) => setSelectedDay(itemValue)}
                        >
                            {diasSemana.map((day) => (
                                <Picker.Item label={day} value={day} key={day} />
                            ))}
                        </Picker>
                        <MySingleButton
                            title="Actualizar Rutina"
                            customPress={updateRutina}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default UpdateRutina;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
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
