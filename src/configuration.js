//This variable is only changed within the server configuration
const runningOnServer = true;
let backend_address;
if (runningOnServer) {
    backend_address = 'http://3.10.61.220:8090/getYourWay';
} else {
    backend_address = 'http://localhost:8080';
}

const LATITUDE = 53.78986162692554;
const LONGITUDE = -1.5330532190720971;
const SECRET_KEY = 'secret';
const BACKEND_ADDRESS = backend_address;

export {BACKEND_ADDRESS, SECRET_KEY, LONGITUDE, LATITUDE};