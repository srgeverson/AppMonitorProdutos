import React from "react";
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

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Amy Farha',
        avatar_url: 'https://uifaces.co/our-content/donated/XdLjsJX_.jpg',
        subtitle: 'Vice President',
        linearGradientColors: ['#FF9800', '#F44336'],
        quantidade: 10,
        subQuantidade: 20,
        data: new Date(),
        quantidadeArtigo: 10
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
        name: 'Chris Jackson',
        avatar_url: 'https://uifaces.co/our-content/donated/KtCFjlD4.jpg',
        subtitle: 'Vice Chairman',
        linearGradientColors: ['#3F51B5', '#2196F3'],
        quantidade: 1000,
        subQuantidade: 2000,
        data: new Date(),
        quantidadeArtigo: 10
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
        name: 'Amanda Martin',
        avatar_url: 'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=047fade70e80ebb22ac8f09c04872c40',
        subtitle: 'CEO',
        linearGradientColors: ['#FFD600', '#FF9800'],
        quantidade: 100,
        subQuantidade: 200,
        data: new Date(),
        quantidadeArtigo: 10
    }
];
const Acompanhamento = () => {
    const irPara = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
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