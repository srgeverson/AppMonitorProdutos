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

    async dadosFake() {
        try {
            let artigos = [
                { label: 'Artigo 1', value: '1' },
                { label: 'Artigo 2', value: '2' },
                { label: 'Artigo 3', value: '3' },
                { label: 'Artigo 4', value: '4' },
                { label: 'Artigo 5', value: '5' },
                { label: 'Artigo 6', value: '6' },
                { label: 'Artigo 7', value: '7' },
                { label: 'Artigo 8', value: '8' },
            ];
            let id = 1;
            artigos.forEach(async (artigo) => {
                const ultimoId = await this.artigoDAO.selectMax();
                if (ultimoId.rows && ultimoId.rows.item(0).ultimoId != null)
                    id = ultimoId.rows.item(0).ultimoId + 1;
                const salvar = {
                    id: id,
                    nome: artigo.label
                };
                await this.artigoDAO.insert(salvar);
            });
           
        } catch (error) {
            console.log(error);
        }
    }
}