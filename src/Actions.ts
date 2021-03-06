import { Dispatch } from "redux"
import { FetchUtil } from "./FetchUtil"

const apiServer = process.env.API_SERVER ? process.env.API_SERVER : ""

export function getMyDetails(success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_USER_STARTED" })
        fetch(apiServer + "/auth/me", FetchUtil.get()).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_USER_COMPLETED", myDetails : data})
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({type: "AUTH_FAILED"})
                return
            }
            console.log("Error while fetching user", err)
            dispatch({ type: "FETCH_USER_FAILURE", err: err})
            if (error) error(err)
        })
    }
}

export function filterModel(model: string, item: any, success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model })
        fetch(apiServer + "/model/" + model + "/filter", FetchUtil.post(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data: data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({type: "AUTH_FAILED"})
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function fetchModel(model: string, success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model })
        fetch(apiServer + "/model/" + model, FetchUtil.get()).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data : data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({type: "AUTH_FAILED"})
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function createOrModify(model: string, item: any, edit: boolean, success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        const word = edit ? "MODIFY" : "CREATE"
        dispatch({ type: word + "_" + model + "_STARTED", model: model })
        fetch(apiServer + "/model/" + model, edit ? FetchUtil.put(item) : FetchUtil.post(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: word + "_" + model + "_COMPLETED", data : data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({type: "AUTH_FAILED"})
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: word + "_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function deleteModel(model: string, item: any, success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "DELETE_" + model + "_STARTED", model: model })
        fetch(apiServer + "/model/" + model, FetchUtil.delete(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "DELETE_" + model + "_COMPLETED", data : data, model: model })
            if(success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({type: "AUTH_FAILED"})
                return
            }
            console.log("Error while deleting" + model, err)
            dispatch({ type: "DELETE_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

