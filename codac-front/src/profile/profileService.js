import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';
let ambiente = new ValidarAmbienteService();
export class ProfileService {
    async getUser(data={}) {
        let respuesta = {};
        async function getDAtaUser(data){
          let ambienteFinal = ambiente.getAmbiente();
          let url = ambienteFinal+"/users/usersWS";
            try {
              const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data.row) // body data type must match "Content-Type" header
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