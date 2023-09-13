type DataHandler = { codigo: string, mensagem: string, descricao: string };
type ErrorHandler = { id: string, nome: string, data: DataHandler, status: number | undefined, statusText: string,  };

const errorHandler = (erro: ErrorHandler) => {
    if (erro && erro.data && erro.data.codigo){
        return {
            statusCode: erro.data.codigo, 
            mensagem:erro.data.mensagem, 
            descricao: erro.data.descricao
        };
    } else {
        if(erro.status){
            return { 
                statusCode: erro.status, 
                mensagem:"Falha na operação", 
                descricao: erro.statusText, 
            }
        } else{
            return { 
                statusCode: 500, 
                mensagem:"Falha na operação", 
                descricao: "Ocorreu um erro interno no servidor, contate o administrador do sistema!", 
            }
        }
    }
}
export default errorHandler;