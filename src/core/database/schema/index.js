export const SupportedTypes = {
    INTEGER: {
        value: 'INTEGER',
        type: 'INTEGER',
        default_value: null
    },
    LONG: {
        value: 'LONG',
        type: 'INTEGER',
        default_value: null
    },
    DOUBLE: {
        value: 'DOUBLE',
        type: 'REAL',
        default_value: null
    },
    TEXT: {
        value: 'TEXT',
        type: 'TEXT',
        default_value: null
    },
    BOOLEAN: {
        value: 'BOOLEAN',
        type: 'INTEGER',
        default_value: null
    },
    DATETIME: {
        value: 'DATETIME',
        type: 'TEXT',
        default_value: null
    },
    SYNC_STATUS: {
        value: 'STATUS',
        type: 'TEXT',
        default_value: null
    },
    JSON: {
        value: 'JSON',
        type: 'TEXT',
        default_value: null
    },
};

export const Tables = {
    acompanhamentos: {
        id: {
            type: SupportedTypes.INTEGER,
            primary_key: true,
            default_value: null,
        },
        data: {
            type: SupportedTypes.DATETIME,
            primary_key: false,
            default_value: null,
        },
        quantidadeCores: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        },
        quantidadeArtigo: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        },
        quantidadePecas: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        }
    },
    acompanhamentoProdutos: {
        id: {
            type: SupportedTypes.INTEGER,
            primary_key: true,
            default_value: null,
        },
        acompanhamentoId: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        },
        artigoId: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        },
        corId: {
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        },
        quantidade:{
            type: SupportedTypes.INTEGER,
            primary_key: false,
            default_value: null,
        }
    },
    cores: {
        id: {
            type: SupportedTypes.INTEGER,
            primary_key: true,
            default_value: null,
        },
        nome: {
            type: SupportedTypes.TEXT,
            primary_key: false,
            default_value: null,
        },
    },
    artigos: {
        id: {
            type: SupportedTypes.INTEGER,
            primary_key: true,
            default_value: null,
        },
        nome: {
            type: SupportedTypes.TEXT,
            primary_key: false,
            default_value: null,
        },
    },
    produtos: {
        id: {
            type: SupportedTypes.INTEGER,
            primary_key: true,
            default_value: null,
        },
        nome: {
            type: SupportedTypes.TEXT,
            primary_key: false,
            default_value: null,
        },
    },
};