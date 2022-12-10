import { URL } from "./url.js";

export const httpGET = async (path, _order = "") => {
    try {
        let response = await fetch(URL + path + _order);
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

export const httpPOST = async (path, newData) => {
    try {
        let response = await fetch(
            URL + path,
            {
                body: JSON.stringify(newData),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

export const httpPATCH = async (path, newPro, id) => {
    try {
        let response = await fetch(
            URL + path + `/${id}`,
            {
                body: JSON.stringify(newPro),
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

export const httpDELETE = async (path, id) => {
    try {
        let response = await fetch(
            `${URL}${path}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}