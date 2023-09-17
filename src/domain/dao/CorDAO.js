import SQLiteManager from "../../core/database/SQLiteManager";

export default class CorDAO {

    deleteById(id) {
        return new Promise((resolve, reject) => {
            SQLiteManager.delete(`DELETE FROM cores AS c WHERE (c.id = ? AND NOT EXISTS(SELECT 1 FROM acompanhamentoProdutos AS ap WHERE ap.corId = c.id));`, [id])
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
            SQLiteManager.insert('INSERT OR REPLACE INTO cores (id, nome, ativo) VALUES (?, ?, ?)',
                [
                    objeto.id ? objeto.id : null,
                    objeto.nome ? objeto.nome : null,
                    objeto.ativo ? objeto.ativo : true,
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
            SQLiteManager.select(`SELECT * FROM cores WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    selectAllAtivo() {
        return new Promise((resolve, reject) => {
            SQLiteManager.select(`SELECT * FROM cores WHERE ativo = 1;`, [])
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
            SQLiteManager.select(`SELECT * FROM cores WHERE id = ?;`, [id])
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
            SQLiteManager.select(`SELECT MAX(id) AS ultimoId FROM cores WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateAtivoById(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.update(
                `UPDATE cores SET ativo = ?  WHERE (id = ?);`,
                [
                    objeto.ativo,
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

}