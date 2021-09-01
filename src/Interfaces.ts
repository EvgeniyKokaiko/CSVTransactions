export interface ActionObject {
    type: string,
    payload: any
}


export interface Data {
    TransactionId: string,
    Status: string,
    Type: string,
    ClientName: string,
    Amount: string
}


export interface Store {
    dataReducer: Data[]
}