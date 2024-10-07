

interface IRespuestaVeriDoc {
  globalResult: string
  documentData: IDocumentData[];
}

interface IDocumentData {
  name: string;
  source: string;
  type: string;
  value: string;
}

interface IDocumentVerifications {
  category: string,
  inputFields: any,
  name: string,
  output: string,
  result: boolean | string,
}

declare namespace VeriDoc {
  export enum GlobalResult {
    OK = "Ok",
  }
}