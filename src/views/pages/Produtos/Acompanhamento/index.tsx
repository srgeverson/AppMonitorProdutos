import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, FlatList, View } from 'react-native';
import { ListItem, Icon, Input, Button } from '@rneui/themed';
import { rotas } from "../../../../core/Config";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import CorService from "../../../../domain/service/CorService";
import ArtigoService from "../../../../domain/service/ArtigoService";

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
    const [cores, setCores] = useState([]);
    const [cor, setCor] = useState(null);
    const [artigos, setArtigos] = useState([]);
    const [artigo, setArtigo] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const corService =  new CorService();
    const artigoService = new ArtigoService();

    useEffect(() => {
        if (route && route.params)
            setId(route.params);
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const coresSalvas = await corService.buscarTodos();
            console.log(coresSalvas)
            if (coresSalvas)
                setCores(coresSalvas);
            const artigosSalvos = await artigoService.buscarTodos();
            if (artigosSalvos)
                setArtigos(artigosSalvos);
            // const itensTemp = await servide.buscarAcompanhamentoTemp();
            // if (itensTemp)
            //     setItens(itensTemp);

        } catch (error) {
            console.log(error)
        } finally {
            setCarregando(false);
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.drops}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cores}
                        search
                        maxHeight={300}
                        labelField="nome"
                        valueField="id"
                        placeholder={!isFocus ? 'Selecione uma cor' : '...'}
                        searchPlaceholder="Pesquisar..."
                        value={cor}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCor(item.id);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Icon name="check" type="font-awesome" size={20} color={isFocus ? 'blue' : 'black'} />
                        )}
                    />
                </View>
                <View style={styles.drops}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={artigos}
                        search
                        maxHeight={300}
                        labelField="nome"
                        valueField="id"
                        placeholder={!isFocus ? 'Selecione um artigo' : '...'}
                        searchPlaceholder="Pesquisar..."
                        value={artigo}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setArtigo(item.id);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Icon name="check" type="font-awesome" size={20} color={isFocus ? 'blue' : 'black'} />
                        )}
                    />
                </View>
                <View style={styles.drops}>
                    <Input
                        placeholder='Quantidade'
                        errorStyle={{ color: 'red' }}
                        errorMessage={quantidade ? '' : '*Informe uma quantidade'}
                        onChange={setQuantidade}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.drops}>
                    <Button title="Adicionar" type="solid" loading={carregando} />
                </View>

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
    }, dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    drops: {
        margin: 5
    }
});

export default Acompanhamento;