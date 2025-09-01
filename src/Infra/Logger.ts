import express, { Request, Response, NextFunction } from 'express';

class Logger {
    private static implementacao(req: Request, res: Response, next: NextFunction) {
        console.log(`Chamada ao método: ${req.method} url: ${req.url} - ${new Date().toISOString()}`);
        next();
    }

    static init() {
        return this.implementacao;
    }
}

export default Logger;