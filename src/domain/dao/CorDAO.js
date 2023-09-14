import SQLiteManager from "../../core/database/SQLiteManager";

export default class CorDAO {

    insert(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.insert(`INSERT INTO cores(id, nome) VALUES (?, ?);`, [objeto.id, objeto.nome])
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
}