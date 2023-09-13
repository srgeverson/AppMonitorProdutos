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
}

export default ProdutoService;