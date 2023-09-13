import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, FlatList, View } from 'react-native';
import { ListItem, Icon, Input,Button } from '@rneui/themed';
import { rotas } from "../../../../core/Config";
import { useNavigation } from "@react-navigation/native";

type ItemProps = { id: string, nome: string, subTitulo: string, quantidade: number | undefined, subQuantidade: number | undefined, ir: Function };

const Item = ({ id, nome, subTitulo, quantidade, subQuantidade, ir }: ItemProps) => (

    <ListItem key={id}
        bottomDivider
        onPress={() => ir()}>
        <Icon name="list-ol" type="font-awesome" color="blue" />
        <ListItem.Content>
            <ListItem.Title style={{ color: 'blue' }}>
                {`${nome} artigo(s)`}
            </ListItem.Title>
            <ListItem.Subtitle>{subTitulo}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
            <ListItem.Title right style={{ color: 'green' }}>
                {`${subQuantidade} cores`}
            </ListItem.Title>
            <ListItem.Subtitle right>{`${quantidade} peças`}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
);

const Acompanhamento = ({ route, navigation }) => {
    const irPara = useNavigation();
    const [id, setId] = useState('');
    const [quantidade, setQuantidade] = useState(undefined);
    const [carregando, setCarregando] = useState(false);
    const [itens, setItens] = useState([]);
    useEffect(() => {
        if (route && route.params)
            setId(route.params);
    }, []);
    
    return (
    
        <SafeAreaView style={styles.container}>
            <View>
                <Input
                    placeholder='Quantidade'
                    errorStyle={{ color: 'red' }}
                    errorMessage={quantidade ? '' : '*Informe uma quantidade'}
                    onChange={setQuantidade}
                    keyboardType="number-pad"
                />
                <Button title="Adicionar" type="solid" loading={carregando}/>
            </View>
            <FlatList
                data={itens}
                renderItem={({ item }) => <Item
                    id={item.id}
                    nome={item.quantidadeArtigo.toString()}
                    subTitulo={item.data.toLocaleString([], { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    quantidade={item.quantidade}
                    subQuantidade={item.subQuantidade}
                    ir={() => irPara.navigate(rotas.paginaInicial as never, { id: item.id })}
                />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default Acompanhamento;