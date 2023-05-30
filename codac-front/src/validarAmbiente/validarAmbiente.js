export class ValidarAmbienteService {
    getAmbiente() {
        let ambiente =  window.location.host;
        let ambienteArr = ambiente.split("-");
        for (let i = 0; i < ambienteArr.length; i++) {
           if(ambienteArr[i] == "hml.gcba.gob.ar") {
                ambiente = process.env.REACT_APP_apiUrlBackHml;
                break;
            }else if(ambienteArr[i] == "qa.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlBackQa;
                break;
            }else if(ambienteArr[i] == "dev.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlBackDev;
                break;
            }else if(ambienteArr[i] == "prod"){
                ambiente = process.env.REACT_APP_apiUrlBackProd;
                break;
            }else if(ambienteArr.length == 1){
                ambiente = process.env.REACT_APP_apiUrlBackLocal;
                break;
            }
        }
        return ambiente;
    }

    getAmbienteWS() {
        let ambiente =  window.location.host;
        let ambienteArr = ambiente.split("-");
        for (let i = 0; i < ambienteArr.length; i++) {
           if(ambienteArr[i] == "hml.gcba.gob.ar") {
                ambiente = process.env.REACT_APP_apiUrlWsDataHml;
                break;
            }else if(ambienteArr[i] == "qa.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlWsDataQa;
                break;
            }else if(ambienteArr[i] == "dev.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlWsDataDev;
                break;
            }else if(ambienteArr[i] == "prod"){
                ambiente = process.env.REACT_APP_apiUrlWsDataProd;
                break;
            }else if(ambienteArr.length == 1){
                ambiente = process.env.REACT_APP_apiUrlWsDataLocal;
                break;
            }
        }
        return ambiente;
    }
}