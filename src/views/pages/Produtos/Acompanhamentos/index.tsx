import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import {
    ListItem,
    Avatar,
    Icon,
    Badge,
    ListItemProps,
    Button,
    Switch,
    lightColors
} from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { rotas } from "../../../../core/Config";
import ProdutoService from "../../../../service/Produto";

type ItemProps = { id: string, nome: string, subTitulo: string, quantidade: number | undefined, subQuantidade: number | undefined, ir: Function };

const Item = ({ id, nome, subTitulo, quantidade, subQuantidade, ir }: ItemProps) => (

    <ListItem key={id}
        bottomDivider
        onPress={ir}
    >
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

const Acompanhamento = () => {
    const irPara = useNavigation();
    const service = new ProdutoService();
    const [itens, setItens] = useState([]);
    const buscandoItensSalvos = async () => {
        const itensSalvos = await service.buscarAcompanhamentos();
        if (itensSalvos)
            setItens(itensSalvos);
    }
    useEffect(() => {
        buscandoItensSalvos();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itens}
                renderItem={({ item }) => <Item
                    id={item.id}
                    nome={item.quantidadeArtigo.toString()}
                    subTitulo={item.data.toLocaleString([], { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    quantidade={item.quantidade}
                    subQuantidade={item.subQuantidade}
                    ir={() => irPara.navigate(rotas.produtoAcompanhamento as never, { id: item.id })}
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
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default Acompanhamento;