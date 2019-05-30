import {PRODUCTION_CONFIG} from "./config.production";
import {DEV_CONFIG} from "./config.dev";
import {DEV_DOCKER_CONFIG} from "./config.dev.docker";
import {DEV_ONLINEBACKEND_CONFIG} from "./config.dev.onlineBackEnd";

let IndexConfig;
if(process.env.NODE_ENV === 'dev-onlineBackEnd') {
    IndexConfig = DEV_ONLINEBACKEND_CONFIG;
}
else if (process.env.NODE_ENV === 'dev-docker') {
    IndexConfig = DEV_DOCKER_CONFIG;
}else{
    IndexConfig = process.env.NODE_ENV === 'production' ? PRODUCTION_CONFIG : DEV_CONFIG;
}
export default IndexConfig;