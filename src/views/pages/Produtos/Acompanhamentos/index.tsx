import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, } from "react-native";
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
import AcompanhamentoService from "../../../../domain/service/AcompanhamentoService";

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
    const service = new AcompanhamentoService();
    const [itens, setItens] = useState([]);
    const buscandoItensSalvos = async () => {
        const itensSalvos = await service.buscarTodos();
        if (itensSalvos)
            setItens(itensSalvos);
    }
    useEffect(() => {
        buscandoItensSalvos();
    }, [])
    return (
        <>
            <FlatList
                data={itens}
                renderItem={({ item }) => <Item
                    id={item.id}
                    nome={item.quantidadeProduto.toString()}
                    subTitulo={new Date(JSON.parse(item.data)).toLocaleString([], { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    quantidade={item.quantidadeCores}
                    subQuantidade={item.quantidadeProduto}
                    ir={() => irPara.navigate(rotas.produtoAcompanhamento as never, { id: item.id })}
                />}
                keyExtractor={item => item.id}
            />
        </>
    )
}

const styles = StyleSheet.create({
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