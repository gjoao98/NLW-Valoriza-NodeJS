import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuth (request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "6036415851b43d15567406eebf0b29e0") as IPayload;

        request.user_id = sub;

        return next();
    }catch (err) {
        return response.status(401).end();
    }
}