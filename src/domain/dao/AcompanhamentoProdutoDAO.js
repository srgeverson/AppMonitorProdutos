import SQLiteManager from "../../core/database/SQLiteManager";

export default class AcompanhamentoProdutoDAO {

    deleteById(id) {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM acompanhamentoProdutos WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insert(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.insert(`INSERT INTO acompanhamentoProdutos(id, corId, artigoId, quantidade, acompanhamentoId) VALUES (?, ?, ?, ?, ?);`, [objeto.id, objeto.corId, objeto.corId, objeto.quantidade, objeto.acompanhamentoId])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insertOrReplace(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.insert('INSERT OR REPLACE INTO acompanhamentoProdutos (id, corId, artigoId, quantidade, acompanhamentoId) VALUES (?, ?, ?, ?, ?)',
                [
                    objeto.id ? objeto.id : null,
                    objeto.corId ? objeto.corId : null,
                    objeto.artigoId ? objeto.artigoId : null,
                    objeto.quantidade ? objeto.quantidade : null,
                    objeto.acompanhamentoId ? objeto.acompanhamentoId : null
                ])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectAll() {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`SELECT * FROM acompanhamentoProdutos WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectWithJoinByIdAcompanhamento(acompanhamentoId) {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`
            SELECT ap.*, c.nome AS cor, ar.nome AS artigo FROM acompanhamentoProdutos AS ap 
            INNER JOIN cores AS c ON c.id = ap.corId 
            INNER JOIN artigos AS ar ON ar.id = ap.artigoId 
            INNER JOIN acompanhamentos AS ac ON ac.id = ap.acompanhamentoId 
            WHERE ap.acompanhamentoId = ? ;`, [acompanhamentoId])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectAllByCorIdArtigoIdAcompanhamentoId(corId, artigoId, acompanhamentoId) {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(
                `SELECT * FROM acompanhamentoProdutos WHERE corId = ? AND artigoId = ? AND acompanhamentoId = ? ;`,
                [corId, artigoId, acompanhamentoId]
            )
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectMax() {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`SELECT MAX(id) AS ultimoId FROM acompanhamentoProdutos WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateById(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.update(
                `UPDATE acompanhamentoProdutos SET artigoId = ?, corId = ?, acompanhamentoId = ?, quantidade = ?  WHERE (id = ?);`,
                [
                    objeto.artigoId,
                    objeto.corId,
                    objeto.acompanhamentoId,
                    objeto.quantidade,
                    objeto.id,
                ]
            )
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    updateQuantidade(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.update(
                `UPDATE acompanhamentoProdutos SET quantidade = ?  WHERE (artigoId = ? AND corId = ? AND acompanhamentoId = ?);`,
                [
                    objeto.quantidade,
                    objeto.artigoId,
                    objeto.corId,
                    objeto.acompanhamentoId,
                ]
            )
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}