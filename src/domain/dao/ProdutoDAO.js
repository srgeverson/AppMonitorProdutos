import SQLiteManager from "../../core/database/SQLiteManager";

export default class ProdutoDAO {

    insert(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.insert(`INSERT INTO produtos(id, nome) VALUES (?, ?);`, [objeto.id, objeto.nome])
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
            SQLiteManager.insert('INSERT OR REPLACE INTO produtos (id, nome) VALUES (?, ?)',
                [
                    objeto.id ? objeto.id : null,
                    objeto.nome ? objeto.nome : null,
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
            SQLiteManager.select(`SELECT * FROM produtos WHERE 1 = 1;`, [])
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
            SQLiteManager.select(`SELECT * FROM produtos WHERE id = ?;`, [id])
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
            SQLiteManager.select(`SELECT MAX(id) AS ultimoId FROM produtos WHERE 1 = 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}