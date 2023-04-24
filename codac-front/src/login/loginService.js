import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';
let ambiente = new ValidarAmbienteService();
export class LogintService {
    async getUser(data={}) {
        let respuesta = {};
        let respuesta2 = {};
        async function adValidation(data){
          let ambienteFinal = ambiente.getAmbiente();
          let url = ambienteFinal+"/auth/adAuth";
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
            if(respuesta.status != "ERROR"){
              await postData(ambienteFinal+'/auth/',respuesta, data);  
            }else{
              respuesta2 = 0;
            }
            
        }
        async function postData(url = '',validation={}, data = {}) {
            // Default options are marked with *
            data.row.quit = validation.numeroCui;
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
            respuesta2 = await response.json(); // parses JSON response into native JavaScript objects
          }
          
          await adValidation(data);
          return respuesta2;
    }
}