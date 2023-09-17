import SQLiteManager from "../../core/database/SQLiteManager";

export default class ProdutoDAO {

    deleteById(id) {
        return new Promise((resolve, reject) => {
            SQLiteManager.delete(`DELETE FROM produtos AS p WHERE (p.id = ? AND NOT EXISTS(SELECT 1 FROM acompanhamentoProdutos AS ap WHERE ap.produtoId = p.id));`, [id])
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
            SQLiteManager.insert('INSERT OR REPLACE INTO produtos (id, nome, ativo) VALUES (?, ?, ?)',
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
            SQLiteManager.select(`SELECT * FROM produtos WHERE 1 = 1;`, [])
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
            SQLiteManager.select(`SELECT * FROM produtos WHERE ativo = 1;`, [])
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
    
    updateAtivoById(objeto) {
        return new Promise((resolve, reject) => {
            SQLiteManager.update(
                `UPDATE produtos SET ativo = ?  WHERE (id = ?);`,
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