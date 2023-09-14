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

    async buscarPorId(id) {
        try {
            const lista = await this.acompanhamentoDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ArtigoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarUltimoId() {
        try {
            const ultimoId = await this.acompanhamentoDAO.selectMax();
            if (ultimoId.rows && ultimoId.rows.item(0).ultimoId != null)
                return ultimoId.rows.item(0).ultimoId;
            else
                return 0;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async cadastrarSeNaoExistir(id) {
        try {
            const idSolicitado = await this.buscarPorId(id);
            if (idSolicitado)
                return idSolicitado;
            else {
                const salvar = {
                    id: id,
                    quantidadeCores: null,
                    quantidadeArtigo: null,
                    quantidadePecas: null,
                    data: new Date()
                };
                await this.acompanhamentoDAO.insert(salvar);
                return salvar;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async gerarId() {
        try {
            const id = await this.buscarUltimoId();
            return id + 1;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }
}