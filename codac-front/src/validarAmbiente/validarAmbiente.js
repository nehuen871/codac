export class ValidarAmbienteService {
    getAmbiente() {
        let ambiente =  window.location.host;
        let ambienteArr = ambiente.split("-");
        for (let i = 0; i < ambienteArr.length; i++) {
           if(ambienteArr[i] == "hml.gcba.gob.ar") {
                ambiente = process.env.REACT_APP_apiUrlBack;
                break;
            }else if(ambienteArr[i] == "qa.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlBack;
                break;
            }else if(ambienteArr[i] == "dev.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlBack;
                break;
            }else if(ambienteArr[i] == "prod"){
                ambiente = process.env.REACT_APP_apiUrlBack;
                break;
            }else if(ambienteArr.length == 1){
                ambiente = process.env.REACT_APP_apiUrlBack;
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
                ambiente = process.env.REACT_APP_apiUrlWsData;
                break;
            }else if(ambienteArr[i] == "qa.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlWsData;
                break;
            }else if(ambienteArr[i] == "dev.gcba.gob.ar"){
                ambiente = process.env.REACT_APP_apiUrlWsData;
                break;
            }else if(ambienteArr[i] == "prod"){
                ambiente = process.env.REACT_APP_apiUrlWsData;
                break;
            }else if(ambienteArr.length == 1){
                ambiente = process.env.REACT_APP_apiUrlWsData;
                break;
            }
        }
        return ambiente;
    }
}