//This variable is only changed within the server configuration
const runningOnServer = false;
let backend_address;
if (runningOnServer) {
    backend_address = 'http://3.10.61.220:8090/getYourWay';
} else {
    backend_address = 'http://localhost:8080';
}

const SECRET_KEY = 'secret';
const BACKEND_ADDRESS = backend_address;

export {BACKEND_ADDRESS, SECRET_KEY};