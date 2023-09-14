import AcompanhamentoDAO from "../dao/AcompanhamentoDAO";

export default class AcompanhamentoService {

    constructor() {
        this.acompanhamentoDAO = new AcompanhamentoDAO();
    }

    async buscarTodos() {
        try {
            const lista = await this.acompanhamentoDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async dadosFake() {
        try {
            let id = 1;
            const ultimoId = await this.acompanhamentoDAO.selectMax();
            if (ultimoId.rows && ultimoId.rows.item(0).ultimoId != null)
                id = ultimoId.rows.item(0).ultimoId + 1;
            const salvar = {
                id: id,
                quantidadeCores: 10,
                quantidadeArtigo: 100,
                quantidadePecas: 1000,
                data: new Date()
            };
            await this.acompanhamentoDAO.insert(salvar);
        } catch (error) {
            console.log(error);
        }
    }
}