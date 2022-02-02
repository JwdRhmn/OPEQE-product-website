import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link as RouterLink, Route } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Link from "./components/Link";
import Button from "./components/Button";

import Logo from "../Logo";

import useRouter from "../../hooks/useRouter";

import {
	SIGN_UP_PAGE_URL,
	RESERVATION_OPTIONS_PAGE_URL,
	RESERVATION_LIST_PAGE_URL,
	RESERVATION_DETAILS_PAGE_URL,
	HOME_PAGE_URL,
	ORDER_OPTIONS_PAGE_URL,
	LOG_IN_PAGE_URL,
	PROFILE_PAGE_URL,
	SHOPPING_CART_PAGE_URL,
	ORDER_HISTORY_PAGE_URL,
	ITEM_SEARCH_PAGE_URL,
	BANNED_PAGE_URL,
	PRODUCT_PAGE_URL
} from "../../config/routing/";
import {
	HOME_PAGE_THEME,
	ORDER_HISTORY_PAGE_THEME,
	RESERVATION_LIST_PAGE_THEME,
	RESERVATION_OPTIONS_PAGE_THEME,
	LOG_IN_PAGE_THEME,
	PROFILE_PAGE_THEME,
	SHOPPING_CART_PAGE_THEME,
	ITEM_SEARCH_PAGE_THEME,
	BANNED_PAGE_THEME,
	PRODUCT_PAGE_THEME
} from "../../config/layout";
import {
	noFindTableSupport,
	noWaitToBeSeatedSupport
} from "../../config/store";

export default function(props) {
	const {
		className,
		style,
		open,
		breakpoints = {
			xs: 11
		},
		cartBadge,
		profileClick,
		showcart,
		backgroundColor,
		...others
	} = props;

	const switchTopOffset = 100;

	const [isTop, setIsTop] = useState(true);
	const { history, location, matchPath } = useRouter();

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > switchTopOffset) {
				setIsTop(false);
			} else {
				setIsTop(true);
			}
		});
	}, []);

	const { theme: headerTheme, noBack } = getTheme({
		history,
		location,
		matchPath
	});

	const theme = isTop ? headerTheme.onTop : headerTheme.main;

	return (
		<header
			className={cn("header-l1", className)}
			style={theme.style}
			{...others}
		>
			<Grid container justify="center">
				<Grid
					className="container"
					item
					container
					justify="space-between"
					alignItems="center"
					{...breakpoints}
				>
					<span className="left">
						<IconButton
							className={cn("back", { hide: noBack })}
							onClick={() => history.goBack()}
							style={theme.iconButtonStyle}
						>
							<ArrowBackIcon fontSize="inherit" />
						</IconButton>
						<Logo
							component={RouterLink}
							to={`/${HOME_PAGE_URL()}`}
							align="middle"
							width={100}
						/>
					</span>
					<span className="right">
						<Route
							path={`/${RESERVATION_OPTIONS_PAGE_URL()}`}
							render={renderProps => (
								<Link
									href={`/${RESERVATION_LIST_PAGE_URL()}`}
									style={theme.linkStyle}
									exact
								>
									Booking History
								</Link>
							)}
						/>
						{(!noFindTableSupport || !noWaitToBeSeatedSupport) && (
							<Link
								href={`/${
									!noFindTableSupport
										? RESERVATION_OPTIONS_PAGE_URL()
										: RESERVATION_DETAILS_PAGE_URL({
												isWait: true
										  })
								}`}
								style={theme.linkStyle}
							>
								Reservation
							</Link>
						)}
						<Link
							href={`/${ORDER_HISTORY_PAGE_URL()}`}
							style={theme.linkStyle}
						>
							Orders
						</Link>
						{!showcart ? (
							<>
								<Button
									to={`/${LOG_IN_PAGE_URL()}`}
									fixed
									style={theme.logInStyle}
								>
									Log In
								</Button>
								<Button
									to={`/${SIGN_UP_PAGE_URL()}`}
									theme="light"
									style={theme.signUpStyle}
								>
									Sign Up
								</Button>
							</>
						) : (
							<IconButton
								className="profile"
								component={RouterLink}
								to={`/${PROFILE_PAGE_URL()}`}
								style={theme.iconButtonStyle}
							>
								<Badge
									classes={{
										badge: "badge"
									}}
								>
									<PersonIcon fontSize="inherit" />
								</Badge>
							</IconButton>
						)}
						<IconButton
							className="cart"
							component={RouterLink}
							to={`/${SHOPPING_CART_PAGE_URL()}`}
							style={theme.iconButtonStyle}
						>
							<Badge
								classes={{
									badge: "badge"
								}}
								badgeContent={cartBadge}
							>
								<ShoppingBasketIcon fontSize="inherit" />
							</Badge>
						</IconButton>
					</span>
				</Grid>
			</Grid>
		</header>
	);
}

const getTheme = ({ history, location, matchPath }) => {
	const currentPath = location.pathname;

	const checkUrl = (url, exact) =>
		matchPath(currentPath, createRoute(url, exact));

	let out = {};

	if (checkUrl(HOME_PAGE_URL(), true)) {
		out = {
			theme: HOME_PAGE_THEME.header,
			noBack: true
		};
	} else if (checkUrl(RESERVATION_LIST_PAGE_URL())) {
		out = {
			theme: RESERVATION_LIST_PAGE_THEME.header
		};
	} else if (checkUrl(LOG_IN_PAGE_URL())) {
		out = {
			theme: LOG_IN_PAGE_THEME.header
		};
	} else if (checkUrl(ORDER_OPTIONS_PAGE_URL())) {
		out = {
			theme: RESERVATION_OPTIONS_PAGE_THEME.header
		};
	} else if (checkUrl(PROFILE_PAGE_URL())) {
		out = {
			theme: PROFILE_PAGE_THEME.header
		};
	} else if (checkUrl(SHOPPING_CART_PAGE_URL())) {
		out = {
			theme: SHOPPING_CART_PAGE_THEME.header
		};
	} else if (checkUrl(ORDER_HISTORY_PAGE_URL())) {
		out = {
			theme: ORDER_HISTORY_PAGE_THEME.header
		};
	} else if (checkUrl(ITEM_SEARCH_PAGE_URL())) {
		out = {
			theme: ITEM_SEARCH_PAGE_THEME.header
		};
	} else if (checkUrl(BANNED_PAGE_URL())) {
		out = {
			theme: BANNED_PAGE_THEME.header
		};
	} else if (checkUrl(PRODUCT_PAGE_URL())) {
		out = {
			theme: PRODUCT_PAGE_THEME.header
		};
	}

	return out;
};

const createRoute = (url, exact) => ({
	path: `/${url}`,
	exact
});
