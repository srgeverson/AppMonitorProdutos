import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { rotas } from "../../../core/Config";
import AcompanhamentoService from "../../../domain/service/AcompanhamentoService";

const Home = () => {
    const irPara = useNavigation();
    const acompanhamentoService = new AcompanhamentoService();
    return (
        <ScrollView>
            <View style={styles.contentView}>
                <Button
                    title={<TituloCadastrar />}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    buttonStyle={{
                        borderWidth: 0,
                        borderColor: 'transparent',
                        borderRadius: 20,
                    }}
                    containerStyle={{
                        width: 250,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconRight
                    iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    onPress={async() => { 
                        const idAcomp = await acompanhamentoService.gerarId();
                        irPara.navigate(rotas.produtoAcompanhamento as never,{id:idAcomp})}
                    }
                />
                <Button
                    title={<TituloListar />}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    buttonStyle={{
                        borderWidth: 0,
                        borderColor: 'transparent',
                        borderRadius: 20,
                    }}
                    containerStyle={{
                        width: 250,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconRight
                    iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    onPress={() => { irPara.navigate(rotas.produtoAcompanhamentos as never) }}
                />
            </View>
        </ScrollView>
    )
}
const TituloListar = () => {
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ver Conferências</Text>
            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
                Listar Conferências Anteriores
            </Text>
        </View>
    );
};
const TituloCadastrar = () => {
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nova Conferência</Text>
            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
                Cadastrar Conferência
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    }
});
export default Home;