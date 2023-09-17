import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from 'react-native';
import { ListItem, Icon, Input, Button } from '@rneui/themed';
import CorService from "../../../domain/service/CorService";

type ItemProps = { id: string, nome: string, ativo: boolean, quantidade: number | undefined, selecionar: Function };

const Item = ({ id, nome, ativo, quantidade, selecionar }: ItemProps) => (

    <ListItem.Swipeable
        leftContent={(reset) => (
            <Button
                title={`${ativo ? 'Desativar' : 'Ativar'}`}
                onPress={() => reset()}
                icon={<Icon name={`${ativo ? 'ban' : 'check'}`} type="font-awesome" color="white" />}
                buttonStyle={{ minHeight: '100%', backgroundColor: `${ativo ? '#FF8000' : '#0080FF'}` }}
            />
        )}
        rightContent={(reset) => (
            <Button
                title="Apagar"
                onPress={() => reset()}
                icon={<Icon name="trash" type="font-awesome" color="white" />}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            />
        )}
        key={id}
        bottomDivider
        onPress={selecionar}
    >
        <Icon name="list-ol" type="font-awesome" color="blue" />
        <ListItem.Content>
            <ListItem.Title style={{ color: 'blue' }}>
                {`${nome}`}
            </ListItem.Title>
        </ListItem.Content>
    </ListItem.Swipeable>
);

const Cores = ({ route, navigation }) => {
    const [carregando, setCarregando] = useState(false);
    const [itens, setItens] = useState([]);
    const [id, setId] = useState(undefined);
    const [nome, setNome] = useState(undefined);
    const corService = new CorService();

    useEffect(() => {
        if (!itens || itens.length === 0)
            carregarDados();
    }, [id, nome]);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const coresSalvas = await corService.buscarTodos();
            if (coresSalvas)
                setItens(coresSalvas);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregando(false);
        }
    }

    const adicionarItem = async () => {
        try {
            setCarregando(true);
            if (!id) {
                const idNovo = await corService.gerarId();
                setId(idNovo);
            }
            const salvarItem = await corService.salvar({ id, nome });
            const itensLocal = await corService.buscarTodos();
            setItens(itensLocal);
            setId(undefined);
            setNome(undefined);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregando(false);
        }
    }

    const buscar = async (id) => {
        const itemExistente = await corService.buscarPorId(id);
        if (itemExistente) {
            setId(itemExistente.id);
            setNome(itemExistente.nome);
        }
    }
    return (
        <>
            <View>
                <View style={styles.drops}>
                    <Input
                        placeholder='Nome'
                        errorStyle={{ color: 'red' }}
                        errorMessage={nome ? '' : '*Informe um nome'}
                        onChangeText={setNome}
                        value={nome}
                        keyboardType="default"
                    />
                </View>
                <View style={styles.drops}>
                    <Button disabled={!nome}
                        title="Salvar"
                        type="solid"
                        loading={carregando}
                        onPress={adicionarItem}
                    />
                </View>
            </View>
            {/* <SearchBar
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                inputContainerStyle={{backgroundColor: 'white'}}
                    placeholder="Filtro..."
                    onChangeText={setFiltro}
                    value={filtro}
                /> */}
            <FlatList style={styles.drops}
                data={itens}
                renderItem={({ item }) => <Item
                    id={item.id}
                    nome={item.nome}
                    ativo={true}
                    // produto={item.produto}
                    // quantidade={item.quantidade}
                    selecionar={() => buscar(item.id)}
                />}
                keyExtractor={item => item.id}
            />
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

export default Cores;