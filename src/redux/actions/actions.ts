import {redux_types} from "../types";
import {Dispatch} from "redux";
import React from "react";
import {ActionObject, Data} from "../../Interfaces";

export const getDataFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => async (dispatch: Dispatch<ActionObject>) =>  {
    try {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            let text = (e.target.result)
            let splitter = null;
            let results: Data[] = []
                let markers: Data | undefined = {
                  Amount: "",
                  ClientName: "",
                  Status: "",
                  TransactionId: "",
                  Type: "",
                };
            if (typeof text === "string") {
                splitter = text.split("\n")
                splitter.map((el, index) => {
                    const element = el.split(",")
                    const parsedObject = {
                        TransactionId: element[0],
                        Status: element[1],
                        Type: element[2],
                        ClientName: element[3],
                        Amount: element[4]
                    }
                    results.push(parsedObject)
                    return true
                })
               markers = results.shift()
            }


            dispatch({
                type: redux_types.getData,
                payload: [markers, results]
            })
        }
        reader.readAsText(e.target.files![0])
    } catch (e) {};

}