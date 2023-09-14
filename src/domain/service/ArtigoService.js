import ArtigoDAO from "../dao/ArtigoDAO";

export default class ArtigoService {

    constructor() {
        this.artigoDAO = new ArtigoDAO();
    }

    async buscarTodos() {
        try {
            const lista = await this.artigoDAO.selectAll();
            return lista.rows.raw();
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ArtigoService -> ${new Date()} -> erro: ${error}`);
        }
    }

    async buscarPorId(id) {
        try {
            const lista = await this.artigoDAO.selectById(id);
            if (lista.rows && lista.rows.item(0) != null)
                return lista.rows.item(0);
            return null;
        } catch (error) {
            console.log(`Falha no método buscarTodos do arquivo ArtigoService -> ${new Date()} -> erro: ${error}`);
        }
    }
}