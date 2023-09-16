import AcompanhamentoProdutoDAO from "../dao/AcompanhamentoProdutoDAO";

export default class AcompanhamentoProdutoService {

    constructor() {
        this.acompanhamentoProdutoDAO = new AcompanhamentoProdutoDAO();
    }

    async buscarTodos() {
        try {
            const lista = await this.acompanhamentoProdutoDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarTodosPorIdAcompanhamento(idAcompanhamento) {
        try {
            const lista = await this.acompanhamentoProdutoDAO.selectWithJoinByIdAcompanhamento(idAcompanhamento);
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarUltimoId() {
        try {
            const ultimoId = await this.acompanhamentoProdutoDAO.selectMax();
            if (ultimoId.rows && ultimoId.rows.item(0).ultimoId != null)
                return ultimoId.rows.item(0).ultimoId;
            else
                return 0;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoProdutoService -> ${new Date()} -> erro: ${error}`);
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

    async salvar(item) {
        try {
            const existeItem = await this.acompanhamentoProdutoDAO.selectAllByCorIdProdutoIdAcompanhamentoId(item.corId, item.produtoId, item.acompanhamentoId);
            let quantidadeExistente = 0;
            let id = null;
            if (existeItem.rows && existeItem.rows.raw()) {
                existeItem.rows.raw().forEach((item) => {
                    quantidadeExistente += item.quantidade;
                    id = item.id;
                });

            }
            if (!id)
                id = await this.gerarId();

            const objetoAtualizado = {
                id,
                produtoId: item.produtoId,
                corId: item.corId,
                acompanhamentoId: item.acompanhamentoId,
                quantidade: parseInt(item.quantidade) + quantidadeExistente
            };
            await this.acompanhamentoProdutoDAO.insertOrReplace(objetoAtualizado);
            return item;
        } catch (error) {
            console.log(error);
        }
    }
}