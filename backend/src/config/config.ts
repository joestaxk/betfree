type config<T> = {
    PORT: T,
    MONGODB_PORT: T,
    MONGODB_NAME: T,
    VALID_CORS: T,
    CLIENT_PORT: T
}

let new_process = process.env
let ENV:string = new_process.N0DE_ENV || 'development';


let handlerConfig:config<string> = {
    PORT: '0',
    MONGODB_PORT: '0',
    MONGODB_NAME: '',
    VALID_CORS: '*',
    CLIENT_PORT: ''
};

if(ENV === 'production') {
    handlerConfig.PORT = new_process.PORT_PROD
}else {
    // port number
    handlerConfig.PORT = new_process.PORT_DEV;
    handlerConfig.MONGODB_PORT = new_process.MONGODB_PORT_DEV;
    handlerConfig.MONGODB_NAME = new_process.MONGODB_NAME_DEV;
    handlerConfig.CLIENT_PORT  = new_process.CLIENT_PORT
}

module.exports = handlerConfig

