import CorDAO from "../dao/CorDAO";

export default class CorService {

    constructor() {
        this.corDAO = new CorDAO();
    }

    async alterarStatusPorId(id, status) {
        try {
            const deletado = await this.corDAO.updateAtivoById({ id, ativo: status });
            return deletado.rowsAffected > 0;
        } catch (error) {
            console.log(`Falha no método alterarStatusPorId do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async apagarPorId(id) {
        try {
            const deletado = await this.corDAO.deleteById(id);
            return deletado.rowsAffected > 0;
        } catch (error) {
            console.log(`Falha no método apagarPorId do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarPorId(id) {
        try {
            const lista = await this.corDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarTodos() {
        try {
            const lista = await this.corDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo CorService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarTodosAtivos() {
        try {
            const lista = await this.corDAO.selectAllAtivo();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodosAtivos do arquivo CorService -> ${new Date()} -> erro: ${error}`);
        }
    }    
    
    async buscarUltimoId() {
        try {
            const ultimoId = await this.corDAO.selectMax();
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
            console.log(`Falha no método gerarId do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async salvar(objeto) {
        try {
            return await this.corDAO.insertOrReplace(objeto);
        } catch (error) {
            console.log(`Falha no método salvar do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }    
}