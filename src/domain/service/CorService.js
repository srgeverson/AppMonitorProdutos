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
}