const express = require('express');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');
require('dotenv').config()

const app = express();

const PORT = 3000;
const HOST = "localhost";
const API_BASE_URL = process.env.API_BASE_URL;

app.use(morgan("dev"));

const API_SERVICE_URL = `${API_BASE_URL}`;
console.log(API_SERVICE_URL);

app.use('/test', createProxyMiddleware({
	target: API_SERVICE_URL,
	changeOrigin: true,
	pathRewrite: {
		'^/test': '',
	},
}));

app.listen(PORT, HOST, ()=> {
	console.log(`Starting Proxy at ${HOST}:${PORT}`);
});