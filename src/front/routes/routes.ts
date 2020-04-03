let port;
if(process.env.ENVIRONMENT === 'dev'){
    port = 3000;
}else if (process.env.ENVIRONMENT === 'prod'){
    port = 8080;
}

const routes = {
    localhostEndPoint: `http://localhost:${port}`,
    productionEndPoint: `http://0.0.0.0:${port}`,
};

export default routes;
