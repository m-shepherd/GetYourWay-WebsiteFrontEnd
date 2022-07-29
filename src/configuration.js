//This variable is only changed within the server configuration
const runningOnServer = false;
let BACKEND_ADDRESS;
if (runningOnServer) {
    BACKEND_ADDRESS = 'http://3.10.61.220:8090/getYourWay';
} else {
    BACKEND_ADDRESS = 'http://localhost:8080';
}
export default BACKEND_ADDRESS;