import SQLiteManager from "../../core/database/SQLiteManager";

export default class AcompanhamentoDAO {

    deleteById(id) {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM acompanhamentos WHERE (id = ?);`, [id])
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
            SQLiteManager.insert(`INSERT INTO acompanhamentos(id, quantidadeCores, quantidadeProduto, quantidadePecas, data) VALUES (?, ?, ?, ?, ?);`, [objeto.id, objeto.quantidadeCores, objeto.quantidadeProduto, objeto.quantidadePecas, JSON.stringify(objeto.data)])
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
            SQLiteManager.insert('INSERT OR REPLACE INTO acompanhamentos (ativo, criticas, id, idLocal, estadosId, nome, versao) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    objeto.ativo ? objeto.ativo : false,
                    objeto.criticas ? objeto.criticas : null,
                    objeto.id ? objeto.id : null,
                    objeto.idLocal ? objeto.idLocal : objeto.id,
                    objeto.estadosId ? objeto.estadosId : null,
                    objeto.nome ? objeto.nome : null,
                    objeto.versao ? objeto.versao : null,
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
            SQLiteManager.select(`SELECT * FROM acompanhamentos WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectWithJoinById(id) {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`
            SELECT ac.*, c.nome AS cor, ar.nome AS artigo, ap.corId, ap.produtoId, ap.quantidade FROM acompanhamentos AS ac 
            INNER JOIN cores AS c ON c.id = ap.corId 
            INNER JOIN produtos AS ar ON ar.id = ap.produtoId 
            INNER JOIN acompanhamentoProdutos AS ap ON ap.acompanhamentoId = ac.id
            WHERE ac.id = ? ;`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    selectById(id) {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`SELECT * FROM acompanhamentos WHERE id = ?;`, [id])
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
            SQLiteManager.select(`SELECT MAX(id) AS ultimoId FROM acompanhamentos WHERE 1 = 1;`, [])
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
            SQLiteManager.update(`UPDATE acompanhamentos SET data = ?, quantidadeCores = ?, quantidadeProduto = ?, quantidadePecas = ? WHERE (id = ?);`,
                [
                    objeto.data,
                    objeto.quantidadeCores,
                    objeto.quantidadeProduto,
                    objeto.quantidadePecas,
                    objeto.id,
                ])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}