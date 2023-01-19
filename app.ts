import express, { application, Express, Request, Response } from 'express';
import routers from './src/routers';
import dotenv from 'dotenv';
import cors from 'cors';
class App {
    private allowedOrigins = '*';
    private options: cors.CorsOptions = {
        origin: this.allowedOrigins
    };

    public app: Express;
    constructor() {
        this.app = express()
        this.middleware()
        this.routes()

    }
    middleware() {
        this.app.use(express.json())
        this.app.use(cors(this.options))

    }
    routes(): void {
        this.app.use(routers)
    }
}
export default new App().app