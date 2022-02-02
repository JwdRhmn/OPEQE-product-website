import * as firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";

import fetchProduct from "../../store/actions/product/fetchProduct";
import setMessageToken from "../../store/actions/notification/setMessageToken";
import setMessageTokenSentToServer from "../../store/actions/notification/setMessageTokenSentToServer";
import selectDetails from "../../store/selectors/notification/selectDetails";

import {
  PUBLIC_VAPID_KEY,
} from "../config/main/";

let localStore = null;
let messaging = null;

export default (store) => {
  localStore = store;
  


  messaging = firebase.messaging();
  messaging.usePublicVapidKey(PUBLIC_VAPID_KEY);  
  

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
      setTokenSentToServer(false);
      sendTokenToServer(refreshedToken);
      saveToken(refreshedToken);
    }).catch((err) => {
      console.error('Unable to retrieve refreshed token ', err);
    });
  });

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    alert(`Message received: \n${payload.notification.title}\n${payload.notification.body}`);
  });


  requestPermission();
  
}



export const refreshToken = () => {
	deleteToken(() => setCurrentToken());
}



function saveToken(token){
    localStore.dispatch( setMessageToken(token) );
}


function setCurrentToken(){
	messaging.getToken().then((currentToken) => {
	  if (currentToken) {
	    sendTokenToServer(currentToken);
	    saveToken(currentToken);
	  } else {
	    console.log('No Instance ID token available. Request permission to generate one.');
	    setTokenSentToServer(false);        
	  }
	}).catch((err) => {
	  console.log('An error occurred while retrieving token. ', err);
	  setTokenSentToServer(false);
	});
}

function sendTokenToServer(currentToken) {
	if (!isTokenSentToServer()) {
	  console.log('Sending token to server...');
	  
	  fetchProduct({
	  	messageToken: currentToken,
	  })(localStore.dispatch, localStore.getState);

	  
	  setTokenSentToServer(true);
	} else {
	  console.log('Token already sent to server so won\'t send it again ' +
	      'unless it changes');
	}
}

function isTokenSentToServer() {
	const { isSentToServer } = selectDetails( localStore.getState() );
	return isSentToServer;
}

function getStoreToken() {
	const { token } = selectDetails( localStore.getState() );
	return token;
}

function setTokenSentToServer(sent) {
	localStore.dispatch( setMessageTokenSentToServer(sent) );
}

function requestPermission() {
	console.log('Requesting permission...');
	Notification.requestPermission().then((permission) => {
	  if (permission === 'granted') {
	    console.log('Notification permission granted.');
	    setCurrentToken();
	  } else {
	    console.log('Unable to get permission to notify.');
	  }
	});
}

function deleteToken(callBack) {
	const currentToken = getStoreToken();

	messaging.deleteToken(currentToken).then(() => {
	  console.log('Token deleted.');
	  setTokenSentToServer(false);
	  if(callBack){
	  	callBack();
	  }
	}).catch((err) => {
	  console.log('Unable to delete token. ', err);
	});
}