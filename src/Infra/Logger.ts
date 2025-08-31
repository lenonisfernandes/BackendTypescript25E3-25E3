import express, { Request, Response, NextFunction } from 'express';


export default function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Chamada ao método: ${req.method} url: ${req.url} - ${new Date().toISOString()}`);
    next();
}
