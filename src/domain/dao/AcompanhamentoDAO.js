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
            SQLiteManager.insert(`INSERT INTO acompanhamentos(id, quantidadeCores, quantidadeArtigo, quantidadePecas, data) VALUES (?, ?, ?, ?, ?);`, [objeto.id, objeto.quantidadeCores, objeto.quantidadeArtigo, objeto.quantidadePecas, JSON.stringify(objeto.data)])
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

    updateById(cidade) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE acompanhamentos SET nome = ? WHERE (id = ?);`, [cidade.nome, cidade.id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}