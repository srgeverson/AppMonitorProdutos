import SQLite from 'react-native-sqlite-storage';
import * as schema from '../schema';

// const database_name = 'AppMonitorProdutos.db';
// const database_version = '1.0';
// const database_displayname = 'AppMonitorProdutos';
// const database_size = 200000;

class SQLiteManager {

    constructor() {
        SQLite.DEBUG(false);
        SQLite.enablePromise(true);
        this.type = 'SingletonDefaultExportInstance';
        this.db = null;
        this.enabledLog = false;
        this.databaseName = 'AppMonitorProdutos.db';
        this.databaseVersion = '1.0';
        this.databaseDisplayname = 'AppMonitorProdutos';
        this.databaseSize = 200000;
    }

    closeDatabase(db) {
        if (db) {
            db.close()
                .then((status) => {
                    this.enabledLog && console.log('Banco de dados fechado com sucesso!');
                })
                .catch((error) => {
                    this.enabledLog && console.log('Erro ao fechar banco de dados!');
                    this.errorCB(error);
                });
        } else {
            this.enabledLog && console.log('Banco de dados não está aberto!');
        }
    }

    createTable(tx, table, tableName) {
        let sql = `CREATE TABLE IF NOT EXISTS ${tableName} `;
        const createColumns = [];
        for (const key in table) {
            createColumns.push(
                `${key} ${table[key].type.type} ${table[key].primary_key ? 'PRIMARY KEY NOT NULL' : ''
                } default ${table[key].default_value}`,
            );
        }
        sql += `(${createColumns.join(', ')});`;
        tx.executeSql(
            sql,
            [],
            () => {
                //
            },
            () => {
                //
            },
        );
    }

    createTablesFromSchema() {
        if (this.db) {
            this.db.transaction((tx) => {
                for (const name in schema.Tables) {
                    this.createTable(tx, schema.Tables[name], name);
                }
            });
        }
    }

    delete(sql, params) {
        return new Promise((resolve) => {
            SQLite.openDatabase(
                this.databaseName,
                this.databaseVersion,
                this.databaseDisplayname,
                this.databaseSize,
            ).then((db) => {
                this.db = db;
                this.db.transaction((tx) => {
                    tx.executeSql(sql, params)
                        .then(([tx, results]) => {
                            resolve(results);
                        });
                }).then((okCallback) => {
                    this.enabledLog && console.log(`DELETE executado com sucesso! delete -> ${new Date()} -> okCallback: ${okCallback}`);
                }).catch((errorCallback) => {
                    this.enabledLog && console.log(`Erro ao executar DELETE! delete -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
                });
            });
        });
    }

    dropDatabase() {
        return new Promise((resolve, reject) => {
            SQLite.deleteDatabase(this.databaseName)
                .then(() => {
                    SQLite.openDatabase(
                        this.databaseName,
                        this.databaseVersion,
                        this.databaseDisplayname,
                        this.databaseSize,
                    );
                })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        }).catch((error) => {
            this.enabledLog && console.log('Falha ao apagar banco de dados!');
        });
    }

    initDB() {
        let db;
        return new Promise((resolve) => {
            SQLite.echoTest()
                .then(() => {
                    SQLite.openDatabase(
                        this.databaseName,
                        this.databaseVersion,
                        this.databaseDisplayname,
                        this.databaseSize,
                    )
                        .then((DB) => {
                            this.db = DB;
                            db = DB;
                            db.executeSql('SELECT 1 FROM acompanhamentos LIMIT 1')
                                .then(() => {
                                    this.enabledLog && console.log('verificação de existência de DB');
                                })
                                .catch((error) => {
                                    db.transaction((tx) => {
                                        for (const name in schema.Tables) {
                                            this.enabledLog && console.log(`Criando tabela -> ${name}`);
                                            this.createTable(tx, schema.Tables[name], name);
                                        }
                                    })
                                        .then(() => {
                                            this.enabledLog && console.log('Tabelas criadas com sucesso!');
                                        })
                                        .catch(() => {
                                            this.enabledLog && console.log('Erro ao criar tabelas');
                                        });
                                });
                            resolve(db);
                        })
                        .catch((error) => {
                            this.enabledLog && console.log('Erro ao conectar com o banco de dados!');
                        });
                })
                .catch((error) => {
                    this.enabledLog && console.log('Erro ao abrir banco de dados!');
                });
        });
    }

    insert(sql, params) {
        return new Promise((resolve) => {
            SQLite.openDatabase(
                this.databaseName,
                this.databaseVersion,
                this.databaseDisplayname,
                this.databaseSize,
            ).then((db) => {
                this.db = db;
                this.db
                    .transaction((tx) => {
                        tx.executeSql(sql, params)
                            .then(([tx, results]) => {
                                resolve(results);
                            });
                    }).then((okCallback) => {
                        this.enabledLog && console.log(`Dados salvos com sucesso! insertOrReplace -> ${new Date()} -> okCallback: ${okCallback}`);
                    }).catch((errorCallback) => {
                        this.enabledLog && console.log(`Erro ao salvar dados! insertOrReplace -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
                    });
            });
        });
    }

    select(sql, params) {
        return new Promise((resolve) => {
            SQLite.openDatabase(
                this.databaseName,
                this.databaseVersion,
                this.databaseDisplayname,
                this.databaseSize,
            ).then((db) => {
                this.db = db;
                this.db
                    .transaction((tx) => {
                        tx.executeSql(sql, params)
                            .then(([tx, results]) => {
                                resolve(results);
                            });
                    }).then((okCallback) => {
                        this.enabledLog && console.log(`SELECT executado com sucesso! select -> ${new Date()} -> okCallback: ${okCallback}`);
                    }).catch((errorCallback) => {
                        this.enabledLog && console.log(`Erro ao executar SELECT! select -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
                    });
            });
        });
    }
    
    update(sql, params) {
        return new Promise((resolve) => {
            SQLite.openDatabase(
                this.databaseName,
                this.databaseVersion,
                this.databaseDisplayname,
                this.databaseSize,
            ).then((db) => {
                this.db = db;
                this.db
                    .transaction((tx) => {
                        tx.executeSql(sql, params).then(([tx, results]) => {
                            resolve(results);
                        });
                    }).then((okCallback) => {
                        this.enabledLog && console.log(`Dados atualizados com sucesso! update -> ${new Date()} -> okCallback: ${okCallback}`);
                    }).catch((errorCallback) => {
                        this.enabledLog && console.log(`Erro ao atualizae dados! update -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
                    });
            });
        });
    }
}

export default new SQLiteManager();