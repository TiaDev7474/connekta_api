import { Query } from 'express-serve-static-core';

export interface IRequestBody<T> extends Request {
     body: T
}
export interface IRequestQuery<T extends Query> extends Request {
    query: T
}

export interface IRequest<T extends Query, U>  extends Request{
    body:U,
    query:T
}