import { 
    userSignUpURL,
} from "../config/api";

import { 
    appId,
    appType,
} from "../config/app";

import { 
    locationId,
} from "../config/store";

export default function({
    phone, 
    pass, 
    code, 
    email, 
    names: {
        first,
        last,
    },
    address, 
    deviceId,
    countryCode, 
} = {}){

    const body = {
        Apptype: appType,
        AppId: appId,
        LocationId: locationId,
        WirelessConfirmationCode: code,
        Email: email,
        UserName: phone,
        Password: pass,
        FirstName: first,
        LastName: last,
        CountryCode: countryCode,
        Address: {},
        //DeviceId: deviceId,
    }   

        
    return {
        url: `${userSignUpURL}`,
        key: `${userSignUpURL}`,
        body,
        method: 'post',
    }
}