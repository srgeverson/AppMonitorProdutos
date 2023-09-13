export const formataDataEHora = (dataParaTratar: string) => {
    const novaData = new Date(dataParaTratar);
    if (dataParaTratar)
        return novaData.toLocaleString('pt-BR', { timezone: 'UTC' });
    else
        return '';
}

export const formataMoeda = (numeroParaTratar: number) => {
    const novoValor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    if (numeroParaTratar)
        return novoValor.format(numeroParaTratar);
    else
        return novoValor.format(0);
}

export const gerarUUID = () => { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}