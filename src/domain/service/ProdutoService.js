import ProdutoDAO from "../dao/ProdutoDAO";

export default class ProdutoService {

    constructor() {
        this.produtoDAO = new ProdutoDAO();
    }

    async buscarPorId(id) {
        try {
            const lista = await this.produtoDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarPorId do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarTodos() {
        try {
            const lista = await this.produtoDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }
    
    async buscarUltimoId() {
        try {
            const ultimoId = await this.produtoDAO.selectMax();
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
            return await this.produtoDAO.insertOrReplace(objeto);
        } catch (error) {
            console.log(`Falha no método salvar do arquivo ProdutoService -> ${new Date()} -> erro: ${error}`);
        }
    }
}