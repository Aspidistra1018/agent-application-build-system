export interface IMeta {
  reqType: string;
  resType: string;
  url: string;
  method: string;
  reqMapping: IHttpRpcMapping;
  resMapping?: IHttpRpcMapping; // res mapping
  name: string;
  service: string;
  schemaRoot: string;
  serializer?: string;
}

type Fields = string[];

export interface IHttpRpcMapping {
  path?: Fields; // path parameter
  query?: Fields; // query parameters
  body?: Fields; // Body parameters
  header?: Fields; // header parameter
  status_code?: Fields; // HTTP status code
  cookie?: Fields; // cookie
  entire_body?: Fields;
  raw_body?: Fields;
}

export interface CustomAPIMeta {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  reqMapping?: IHttpRpcMapping;
}
