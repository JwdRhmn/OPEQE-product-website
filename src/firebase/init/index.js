import * as firebase from "firebase/app";

import {
	FIREBASE_CONFIG
} from "../config/main";



export default () => {
	return firebase.initializeApp(FIREBASE_CONFIG);
}