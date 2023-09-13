import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../../views/pages/Home';
import { rotas } from "../Config";
import Acompanhamento from "../../views/pages/Produtos/Acompanhamento";
import Acompanhamentos from "../../views/pages/Produtos/Acompanhamentos";

const Rotas = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                }}
            >
                <Stack.Screen name={rotas.paginaInicial} component={Home}
                    options={{
                        title: 'Página Inicial',
                    }}
                />
                <Stack.Screen name={rotas.produtoAcompanhamento} component={Acompanhamento} 
                 options={{
                        title: 'Conferência',
                    }}
                />
                <Stack.Screen name={rotas.produtoAcompanhamentos} component={Acompanhamentos} 
                 options={{
                        title: 'Conferências',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Rotas;