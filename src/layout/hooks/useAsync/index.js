import axios from "axios";

import { useState } from 'react';

export default function () {                           

    const initialState = {
        waiting: null,
        error: null,
        data: null,
    }
    const [ state, setState ] = useState(initialState);
  
    async function handle(request, onSuccess, onFailure){      

        // /##############Faking API#############
        // setState({
        //     ...state,
        //     waiting: true,
        // });
        // setTimeout(() => {
        //     if(false){
        //         if(onFailure){            
        //             onFailure('some FAKE error');
        //         }
        //         setState({
        //             ...state,
        //             waiting: false,
        //             error: 'some FAKE error',
        //         });
        //     } else {
        //         if(onSuccess){
        //             onSuccess(202);
        //         }
        //         setState({
        //             ...state,
        //             waiting: false,
        //             data: 202,
        //         });
        //     }
        // }, 1000); return;                     
        // /#####################################

        setState({
            ...state,
            waiting: true,
        });
        
        try{           
            const promise = axios.request({
                url: request.url,
                method: request.method,
                data: request.body,
                headers: request.headers,
            });    

            const {
                data
            } = await promise;

            if(onSuccess){            
                onSuccess(data);
            }
            setState({
                ...state,
                waiting: false,
                data: data,
            });

            return promise;
        } catch(err) {
            if(onFailure){
                onFailure(err);
            }
            setState({
                ...state,
                waiting: false,
                error: err,
            });
        }        
    }

    return {
        state,
        handle,
    };

}

