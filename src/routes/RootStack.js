import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen"; 
import HomeUser from "../screens/HomeUser";
import HomeMaquina from "../screens/HomeMaquina";
import HomeTipoMaquina from "../screens/HomeTipoMaquina";
import HomeEjercicio from "../screens/HomeEjercicio";
import HomeRutina from "../screens/HomeRutina";
import HomeFiltro from "../screens/HomeFiltro";

import Filtro from "../screens/Filtro";

import RegisterUser from "../screens/RegisterUser";
import UpdateUser from "../screens/UpdateUser";
import ViewAllUsers from "../screens/ViewAllUsers";
import ViewUser from "../screens/ViewUser";
import DeleteUser from "../screens/DeleteUser";

import RegisterMaquina from "../screens/RegisterMaquina";
import UpdateMaquina from "../screens/UpdateMaquina";
import DeleteMaquina from "../screens/DeleteMaquina";
import ViewAllMaquina from "../screens/ViewAllMaquina";
import ViewMaquina from "../screens/ViewMaquina";

import RegisterTipoMaquina from "../screens/RegisterTipoMaquina";
import DeleteTipoMaquina from "../screens/DeleteTipoMaquina";
import UpdateTipoMaquina from "../screens/UpdateTipoMaquina";
import ViewAllTipoMaquina from "../screens/ViewAllTipoMaquina";
import ViewTipoMaquina from "../screens/ViewTipoMaquina";

import RegisterEjercicio from "../screens/RegisterEjercicio";
import DeleteEjercicio from "../screens/DeleteEjercicio";
import UpdateEjercicio from "../screens/UpdateEjercicio";
import ViewAllEjercicio from "../screens/ViewAllEjercicio";
import ViewEjercicio from "../screens/ViewEjercicio";

import RegisterRutina from "../screens/RegisterRutina";
import DeleteRutina from "../screens/DeleteRutina";
import UpdateRutina from "../screens/UpdateRutina";
import ViewAllRutina from "../screens/ViewAllRutina";
import ViewRutina from "../screens/ViewRutina";

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen 
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: "Inicio" }}
                />
                {/*Usuario */}
                <Stack.Screen 
                    name="HomeUser"
                    component={HomeUser}
                    options={{ title: "Gestión de Usuario" }}
                />
                <Stack.Screen 
                    name="RegisterUser"
                    component={RegisterUser}
                    options={{ title: "Registrar Usuario" }}
                />
                <Stack.Screen 
                    name="UpdateUser"
                    component={UpdateUser}
                    options={{ title: "Modificar Usuario" }}
                />
                <Stack.Screen 
                    name="ViewAllUsers"
                    component={ViewAllUsers}
                    options={{ title: "Ver todos los usuarios" }}
                />
                <Stack.Screen 
                    name="ViewUser"
                    component={ViewUser}
                    options={{ title: "Ver usuario" }}
                />
                <Stack.Screen 
                    name="DeleteUser"
                    component={DeleteUser}
                    options={{ title: "Borrar Usuario" }}
                />
                {/*Maquina */}
                <Stack.Screen 
                    name="HomeMaquina"
                    component={HomeMaquina}
                    options={{ title: "Home Maquina" }}
                />
                <Stack.Screen 
                    name="RegisterMaquina"
                    component={RegisterMaquina}
                    options={{ title: "Registrar Maquina" }}
                />
                <Stack.Screen 
                    name="UpdateMaquina"
                    component={UpdateMaquina}
                    options={{ title: "Modificar Maquina" }}
                />
                <Stack.Screen 
                    name="DeleteMaquina"
                    component={DeleteMaquina}
                    options={{ title: "Borrar Maquina" }}
                />
                <Stack.Screen 
                    name="ViewAllMaquina"
                    component={ViewAllMaquina}
                    options={{ title: "Ver todos las Maquinas" }}
                />
                <Stack.Screen 
                    name="ViewMaquina"
                    component={ViewMaquina}
                    options={{ title: "Ver Maquina" }}
                />
                {/*TipoMaquina */}
                <Stack.Screen 
                    name="HomeTipoMaquina"
                    component={HomeTipoMaquina}
                    options={{ title: "Home Tipo Maquina" }}
                />
                <Stack.Screen 
                    name="RegisterTipoMaquina"
                    component={RegisterTipoMaquina}
                    options={{ title: "Registrar Tipo Maquina" }}
                />
                <Stack.Screen 
                    name="UpdateTipoMaquina"
                    component={UpdateTipoMaquina}
                    options={{ title: "Modificar Tipo Maquina" }}
                />
                <Stack.Screen 
                    name="DeleteTipoMaquina"
                    component={DeleteTipoMaquina}
                    options={{ title: "Borrar Tipo Maquina" }}
                />
                <Stack.Screen 
                    name="ViewAllTipoMaquina"
                    component={ViewAllTipoMaquina}
                    options={{ title: "Ver todos los tipos de Maquinas" }}
                />
                <Stack.Screen 
                    name="ViewTipoMaquina"
                    component={ViewTipoMaquina}
                    options={{ title: "Ver Tipo Maquina" }}
                />
                {/*Ejercicio */}
                <Stack.Screen 
                    name="HomeEjercicio"
                    component={HomeEjercicio}
                    options={{ title: "Home Ejercicio" }}
                />
                <Stack.Screen 
                    name="RegisterEjercicio"
                    component={RegisterEjercicio}
                    options={{ title: "Registrar Ejercicio" }}
                />
                <Stack.Screen 
                    name="UpdateEjercicio"
                    component={UpdateEjercicio}
                    options={{ title: "Modificar Ejercicio" }}
                />
                <Stack.Screen 
                    name="DeleteEjercicio"
                    component={DeleteEjercicio}
                    options={{ title: "Borrar Ejercicio" }}
                />
                <Stack.Screen 
                    name="ViewAllEjercicio"
                    component={ViewAllEjercicio}
                    options={{ title: "Ver todos los Ejercicios" }}
                />
                <Stack.Screen 
                    name="ViewEjercicio"
                    component={ViewEjercicio}
                    options={{ title: "Ver Ejercicio" }}
                />
                {/*Rutina */}
                <Stack.Screen 
                    name="HomeRutina"
                    component={HomeRutina}
                    options={{ title: "Home Rutina" }}
                />
                <Stack.Screen 
                    name="RegisterRutina"
                    component={RegisterRutina}
                    options={{ title: "Registrar Rutina" }}
                />
                <Stack.Screen 
                    name="UpdateRutina"
                    component={UpdateRutina}
                    options={{ title: "Modificar Rutina" }}
                />
                <Stack.Screen 
                    name="DeleteRutina"
                    component={DeleteRutina}
                    options={{ title: "Borrar Rutina" }}
                />
                <Stack.Screen 
                    name="ViewAllRutina"
                    component={ViewAllRutina}
                    options={{ title: "Ver todos las Rutina" }}
                />
                <Stack.Screen 
                    name="ViewRutina"
                    component={ViewRutina}
                    options={{ title: "Ver Rutina" }}
                />
                {/*Filtro */}
                <Stack.Screen 
                    name="HomeFiltro"
                    component={HomeFiltro}
                    options={{ title: "Home Filtro" }}
                />
                <Stack.Screen 
                    name="Filtro"
                    component={Filtro}
                    options={{ title: "Filtro" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
