import CorDAO from "../dao/CorDAO";

export default class CorService {

    constructor() {
        this.corDAO = new CorDAO();
    }

    async buscarTodos() {
        try {
            const lista = await this.corDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo CorService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarPorId(id) {
        try {
            const lista = await this.corDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ArtigoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async dadosFake() {
        try {
            let cores = [
                { label: 'Cor 1', value: '1' },
                { label: 'Cor 2', value: '2' },
                { label: 'Cor 3', value: '3' },
                { label: 'Cor 4', value: '4' },
                { label: 'Cor 5', value: '5' },
                { label: 'Cor 6', value: '6' },
                { label: 'Cor 7', value: '7' },
                { label: 'Cor 8', value: '8' },
            ];
            let id = 1;
            cores.forEach(async (cor) => {
                const ultimoId = await this.corDAO.selectMax();
                if (ultimoId.rows && ultimoId.rows.item(0).ultimoId != null)
                    id = ultimoId.rows.item(0).ultimoId + 1;
                const salvar = {
                    id: id,
                    nome: cor.label
                };
                await this.corDAO.insert(salvar);
            });

        } catch (error) {
            console.log(error);
        }
    }
}