import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../../views/pages/Home';
import { rotas } from "../Config";
import Acompanhamento from "../../views/pages/Produtos/Acompanhamento";
import Acompanhamentos from "../../views/pages/Produtos/Acompanhamentos";
import Produtos from "../../views/pages/Produtos";
import Cores from "../../views/pages/Cores";

const Rotas = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={rotas.paginaInicial}
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                }}
            >
                <Stack.Screen name={rotas.cores} component={Cores}
                    options={{
                        title: 'Cores',
                    }}
                />
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
                <Stack.Screen name={rotas.produtos} component={Produtos}
                    options={{
                        title: 'Produtos',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Rotas;