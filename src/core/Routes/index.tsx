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
            <Stack.Navigator>
                <Stack.Screen name={rotas.paginaInicial} component={Home} />
                <Stack.Screen name={rotas.produtoAcompanhamento} component={Acompanhamento} />
                <Stack.Screen name={rotas.produtoAcompanhamentos} component={Acompanhamentos} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Rotas;