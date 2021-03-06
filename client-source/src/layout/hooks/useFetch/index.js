import axios from "axios";

import { useState } from "react";

// this hook will return an object
// with two props :
//  1. state: keeps state of XHR request
//  with three props: waiting, error, data
//  2. fetch: a function that receives 3 args:
//  request (axios request), success callback and
//  failure callback and sends XHR request

export default function() {
    const initialState = {
        waiting: null,
        error: null,
        data: null
    };
    const [state, setState] = useState(initialState);

    async function fetch(request, onSuccess, onFailure) {
        setState({
            ...state,
            waiting: true
        });

        try {
            const promise = axios(request);

            const response = await promise;

            if (onSuccess) {
                onSuccess(response);
            }
            setState({
                ...state,
                waiting: false,
                data: response.data
            });

            return promise;
        } catch (err) {
            if (onFailure) {
                onFailure(err);
            }
            setState({
                ...state,
                waiting: false,
                error: err
            });
        }
    }

    return {
        state,
        fetch
    };
}
