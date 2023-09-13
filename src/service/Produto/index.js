import AsyncStorage from '@react-native-async-storage/async-storage';

class ProdutoService {

    async buscarAcompanhamentos() {
        try {
            const jsonValue = await AsyncStorage.getItem('acompanhamentos');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            throw e;
        }
    }
    async salvarAcompanhamentos(obj) {
        try {
            const jsonValue = JSON.stringify(obj);
            await AsyncStorage.setItem('acompanhamentos', jsonValue);
        } catch (e) {
            throw e;
        }
    }
    async buscarAcompanhamentoTemp() {
        try {
            const jsonValue = await AsyncStorage.getItem('acompanhamentoTemp');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            throw e;
        }
    }
    async salvarAcompanhamentoTemp(obj) {
        try {
            const jsonValue = JSON.stringify(obj);
            await AsyncStorage.setItem('acompanhamentoTemp', jsonValue);
        } catch (e) {
            throw e;
        }
    }

    listarCores() {
        return [
            { label: 'Cor 1', value: '1' },
            { label: 'Cor 2', value: '2' },
            { label: 'Cor 3', value: '3' },
            { label: 'Cor 4', value: '4' },
            { label: 'Cor 5', value: '5' },
            { label: 'Cor 6', value: '6' },
            { label: 'Cor 7', value: '7' },
            { label: 'Cor 8', value: '8' },
        ];
    }
    listarArtigos() {
        return [
            { label: 'Artigo 1', value: '1' },
            { label: 'Artigo 2', value: '2' },
            { label: 'Artigo 3', value: '3' },
            { label: 'Artigo 4', value: '4' },
            { label: 'Artigo 5', value: '5' },
            { label: 'Artigo 6', value: '6' },
            { label: 'Artigo 7', value: '7' },
            { label: 'Artigo 8', value: '8' },
        ];
    }
}

export default ProdutoService;