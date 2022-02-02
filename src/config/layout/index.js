export const DEFAULT_THEME_COLORS = {
	UltraLightGray: "rgba(245, 245, 245, 1.0)",
	MediumLightGray: "rgba(215, 215, 215, 1.0)",
	LightGray: "rgba(188, 188, 188, 1.0)",
	MediumGray: "rgba(165, 165, 165, 1.0)",
	DimGray: "rgba(105, 105, 105, 1.0)",
	DarkGray: "rgba(70, 70, 70, 1.0)",
	UltraDarkGray: "rgba(40, 40, 40, 1.0)",
	DarkOrange: "rgba(247, 159, 31, 1.0)",
	Green: "rgba(0, 163, 0, 1.0)",
	LightGreen: "rgba(153, 180, 51, 1.0)",
	LightPurple: "rgba(159, 0, 167, 1.0)",
	Warning: "rgba(0, 171, 169, 1.0)",
	Main: "rgba(2, 103, 100, 1.0)",
	RouteLine: "rgba(2, 103, 100, 0.5)",
	Complementary: "rgba(0, 0, 0, 1.0)",
	Secondary: "rgba(153, 101, 21, 1.0)",
	Red: "rgba(139, 0, 10, 1.0)"
};

export const CONFIG_RTL = false;

export const HORIZONTAL_LIST_FRAME_SIZE = 6;

export const HOME_PAGE_FOOD_CARD_PROPS = {
	aspectRatio: "120%",
	imageHeight: false,
	detailsHeight: false,
	imageRadius: "5px",
	shadow: false,
};
export const HOME_PAGE_HAPPY_HOUR_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;
export const HOME_PAGE_FAV_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;
export const HOME_PAGE_SPECIAL_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;
export const HOME_PAGE_COUPONS_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;
export const HOME_PAGE_CATERING_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;

export const PRODUCT_PAGE_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;

export const SEARCH_PAGE_FOOD_CARD_PROPS = HOME_PAGE_FOOD_CARD_PROPS;

export const HOME_PAGE_THEME = {
	header: {
		main: {
			style: {
				backgroundColor: "pink"
			},
			linkStyle: {
				color: DEFAULT_THEME_COLORS.DimGray
			},
			signUpStyle: {
				color: DEFAULT_THEME_COLORS.Main,
				backgroundColor: "transparent",
				borderColor: DEFAULT_THEME_COLORS.Main
			},
			logInStyle: {
				color: "white",
				backgroundColor: DEFAULT_THEME_COLORS.Complementary,
				borderColor: DEFAULT_THEME_COLORS.Complementary
			},
			iconButtonStyle: {
				color: DEFAULT_THEME_COLORS.DimGray
			}
		},
		onTop: {
			style: {
				backgroundColor: "pink"
			},
			linkStyle: {
				color: DEFAULT_THEME_COLORS.DimGray
			},
			signUpStyle: {
				color: DEFAULT_THEME_COLORS.Main,
				backgroundColor: "transparent",
				borderColor: DEFAULT_THEME_COLORS.Main
			},
			logInStyle: {
				color: "white",
				backgroundColor: DEFAULT_THEME_COLORS.Complementary,
				borderColor: DEFAULT_THEME_COLORS.Complementary
			},
			iconButtonStyle: {
				color: DEFAULT_THEME_COLORS.Main
			}
		}
	}
};
export const HOME_PAGE_TOP_PROMOTION_PROPS = {
	fillHeader: true,
	image: false,
	imageProps: {
		style: {
			filter: "blur(5px)"
		}
	},
	style: {
		backgroundColor: "pink"
	},
	itemProps: {
		noImage: true,
		textPrimaryProps: {
			style: {
				color: DEFAULT_THEME_COLORS.Complementary
			}
		},
		textSecondaryProps: {
			style: {
				color: DEFAULT_THEME_COLORS.DimGray
			}
		},
		mainButtonProps: {
			style: {
				color: "white",
				backgroundColor: DEFAULT_THEME_COLORS.UltraDarkGray,
				borderColor: DEFAULT_THEME_COLORS.UltraDarkGray
			},
			captionStyle: {
				color: "white",
				backgroundColor: DEFAULT_THEME_COLORS.Main
			}
		}
	},
	sliderButtonsProps: {
		style: {
			color: DEFAULT_THEME_COLORS.Main
		}
	}
};

export const RESERVATION_LIST_PAGE_THEME = HOME_PAGE_THEME;
export const RESERVATION_LIST_PAGE_TOP_PROMOTION_PROPS = HOME_PAGE_TOP_PROMOTION_PROPS;

export const ORDER_HISTORY_PAGE_THEME = HOME_PAGE_THEME;
export const ORDER_HISTORY_TOP_PROMOTION_PROPS = HOME_PAGE_TOP_PROMOTION_PROPS;

export const RESERVATION_OPTIONS_PAGE_THEME = HOME_PAGE_THEME;
export const RESERVATION_OPTIONS_PAGE_TOP_PROMOTION_PROPS = HOME_PAGE_TOP_PROMOTION_PROPS;

export const LOG_IN_PAGE_THEME = HOME_PAGE_THEME;

export const SHOPPING_CART_PAGE_THEME = HOME_PAGE_THEME;

export const PROFILE_PAGE_THEME = HOME_PAGE_THEME;

export const ITEM_SEARCH_PAGE_THEME = HOME_PAGE_THEME;
export const ITEM_SEARCH_PAGE_TOP_PROMOTION_PROPS = HOME_PAGE_TOP_PROMOTION_PROPS;

export const BANNED_PAGE_THEME = HOME_PAGE_THEME;

export const PRODUCT_PAGE_THEME = HOME_PAGE_THEME;