import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { ListItem, Icon, Input, Button, SpeedDial } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import CorService from "../../../../domain/service/CorService";
import ProdutoService from "../../../../domain/service/ProdutoService";
import AcompanhamentoProdutoService from "../../../../domain/service/AcompanhamentoProdutoService";
import AcompanhamentoService from "../../../../domain/service/AcompanhamentoService";

type ItemProps = { id: string, artigo: string, cor: string, quantidade: number | undefined };

const Item = ({ id, artigo, cor, quantidade }: ItemProps) => (

    <ListItem key={id}
        bottomDivider>
        <Icon name="list-ol" type="font-awesome" color="blue" />
        <ListItem.Content>
            <ListItem.Title style={{ color: 'blue' }}>
                {`${artigo}`}
            </ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
            <ListItem.Title right style={{ color: 'green' }}>
                {`${cor}`}
            </ListItem.Title>
            <ListItem.Subtitle right>{`${quantidade} peças`}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
);

const Acompanhamento = ({ route, navigation }) => {
    const [quantidade, setQuantidade] = useState(undefined);
    const [carregando, setCarregando] = useState(false);
    const [itens, setItens] = useState([]);
    const [cores, setCores] = useState([]);
    const [cor, setCor] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [artigo, setProduto] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const corService = new CorService();
    const artigoService = new ProdutoService();
    const acompanhamentoProdutoService = new AcompanhamentoProdutoService();
    const acompanhamentoService = new AcompanhamentoService();
    const { id } = route.params;
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        carregarDados();
        return () => {
            atualizarRegistro();
        }
    }, [id]);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const coresSalvas = await corService.buscarTodosAtivos();
            if (coresSalvas)
                setCores(coresSalvas);
            const produtosSalvos = await artigoService.buscarTodosAtivos();
            if (produtosSalvos)
                setProdutos(produtosSalvos);
            if (id) {
                const itensLocal = await acompanhamentoProdutoService.buscarTodosPorIdAcompanhamento(id);
                setItens(itensLocal);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setCarregando(false);
        }
    }

    const adicionarItem = async () => {
        try {
            setCarregando(true);
            const artigoItem = await artigoService.buscarPorId(artigo);
            const corItem = await corService.buscarPorId(cor);
            const acompanhamentoItem = await acompanhamentoService.cadastrarSeNaoExistir(id);
            let itemParaSalvar = {
                produtoId: artigoItem.id,
                corId: corItem.id,
                acompanhamentoId: acompanhamentoItem.id,
                quantidade
            }
            const salvarItem = await acompanhamentoProdutoService.salvar(itemParaSalvar);
            const itensLocal = await acompanhamentoProdutoService.buscarTodosPorIdAcompanhamento(id);
            setItens(itensLocal);
            // console.log(itensLocal);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregando(false);
        }
    }

    const atualizarRegistro = async () => {
        await acompanhamentoService.atualizarRegistroInserido(id);
    }
    return (

        <>
            <View>
                <View style={styles.drops}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={produtos}
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
                            setProduto(item.id);
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
                    <Input
                        placeholder='Quantidade'
                        errorStyle={{ color: 'red' }}
                        errorMessage={quantidade ? '' : '*Informe uma quantidade'}
                        onChangeText={setQuantidade}
                        value={quantidade}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.drops}>
                    <Button disabled={!id || !cor || !artigo || !quantidade}
                        title="Adicionar"
                        type="solid"
                        loading={carregando}
                        onPress={adicionarItem}
                    />
                </View>
            </View>
            <View style={styles.drops}>
                <FlatList
                    data={itens}
                    renderItem={({ item }) => <Item
                        id={item.id}
                        artigo={item.artigo}
                        cor={item.cor}
                        quantidade={item.quantidade}
                    />}
                    keyExtractor={item => item.id}
                />
            </View>
            <SpeedDial
                isOpen={open}
                icon={<Icon name="ellipsis-v" type="font-awesome" color="#fff" />}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    icon={<Icon name="file-excel-o" type="font-awesome" color="#fff" />}
                    title="Exportar"
                    onPress={() => Alert.alert('Não implentado!')}
                />
                <SpeedDial.Action
                    icon={<Icon name="whatsapp" type="font-awesome" color="#fff" />}
                    title="Compartilhar"
                    onPress={() => {
                        Alert.alert('Não implentado!');
                    }}
                />
            </SpeedDial>
        </>
    )
}

const styles = StyleSheet.create({
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