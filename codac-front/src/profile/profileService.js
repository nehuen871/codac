import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';
let ambiente = new ValidarAmbienteService();
export class ProfileService {
    async getUser(data={}) {
        let respuesta = {};
        async function getDAtaUser(data){
          let ambienteFinal = ambiente.getAmbienteWS();
          console.log(ambienteFinal);
          let url = ambienteFinal+"/users/"+data.row.buscar;
            try {
              const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
              });
              respuesta = await response.json();
            }
            catch (e) {
              console.log(e)
            } 
        }
        await getDAtaUser(data);
        return respuesta;
    }
}