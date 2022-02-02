import { 
    checkDuplicateCodeURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({ phone, code }){                                     
    
    const body = {
        AppType: appType,
		AppId: appId,
		Wireless: phone,
		SecureCode: code,
    }  

    return {
        url: checkDuplicateCodeURL,
        key: checkDuplicateCodeURL,
        body,
        method: 'post',
    } 
}




