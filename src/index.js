import "react-app-polyfill/ie11";

import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";

import * as mainServiceWorker from "./service-worker";
import startFirebase, { FCMServiceWorker } from "./firebase";
import Layout from "./layout";
import createStore from "./store";
import { CONFIG_RTL } from "./layout/config/layout/";

import isMobile from "./functions/isMobile";

// ON LOAD CONFIGURATIONS
if ("scrollRestoration" in window.history) {
	window.history.scrollRestoration = isMobile ? "manual" : "auto";
}

smoothscroll.polyfill();

const supportsHistory = "pushState" in window.history;

const root = document.getElementById("root");
const head = document.querySelector("head");

head.setAttribute("dir", CONFIG_RTL ? "rtl" : "ltr");
root.setAttribute("dir", CONFIG_RTL ? "rtl" : "ltr");

setRootFullHeight(root);
window.addEventListener("resize", () => {
	setRootFullHeight(root);
});
//##########################

// RENDER APP
function renderApp(store) {
	render(
		<StoreProvider store={store}>
			<Router forceRefresh={!supportsHistory}>
				<Layout />
			</Router>
		</StoreProvider>,
		root
	);

	// startFirebase(store);
}

createStore(renderApp, 0);
//##########################

// REGISTER SERVICE WORKERS
mainServiceWorker.register();
FCMServiceWorker.register();
//##########################

// OTHER FUNCTIONS
function setRootFullHeight(root) {
		root.style.height = `${window.innerHeight}px`;
		root.style.minHeight = `${window.innerHeight}px`;
}
//##########################
