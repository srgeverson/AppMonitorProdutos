import AcompanhamentoDAO from "../dao/AcompanhamentoDAO";

export default class AcompanhamentoService {

    constructor() {
        this.acompanhamentoDAO = new AcompanhamentoDAO();
    }

    async atualizarRegistroInserido(id) {
        try {
            const existeItem = await this.acompanhamentoDAO.selectWithJoinById(id);
            let data = null;
            let quantidadeCores = 0;
            let quantidadeProduto = 0;
            let quantidadePecas = 0;
            if (existeItem.rows && existeItem.rows.raw()) {
                existeItem.rows.raw().forEach((item) => {
                    data = item.data;
                    quantidadePecas += item.quantidade;
                });
                const agruparPorCor = this.groupBy(existeItem.rows.raw(), 'corId');
                for (key in agruparPorCor)
                    if (agruparPorCor.hasOwnProperty(key))
                        quantidadeCores++;
                const agruparPorProduto = this.groupBy(existeItem.rows.raw(), 'produtoId');
                for (key in agruparPorProduto)
                    if (agruparPorProduto.hasOwnProperty(key))
                        quantidadeProduto++;
            }
            const objetoAtualizado = {
                id,
                data,
                quantidadeCores,
                quantidadeProduto,
                quantidadePecas,
            };
            await this.acompanhamentoDAO.updateById(objetoAtualizado);
            return objetoAtualizado;
        } catch (error) {
            console.log(error);
        }
    }

    groupBy(array, key) {
        return array.reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
    }

    async buscarTodos() {
        try {
            const lista = await this.acompanhamentoDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo AcompanhamentoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarTodosAtivos() {
        try {
            const lista = await this.acompanhamentoDAO.selectAllAtivo();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodosAtivos do arquivo AcompanhamentoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarPorId(id) {
        try {
            const lista = await this.acompanhamentoDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
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
                    quantidadeProduto: null,
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