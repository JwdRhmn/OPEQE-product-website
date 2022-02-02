export const locationId = "23D12140-B2AF-4735-8D51-3A566AA0F515";

export const storeLocation = {
	lat: 34.1607755,
	lng: -118.511304
};
export const storeOpenTimeRange = {
	start: "11:00:00",
	end: "23:00:00"
};
export const storeDeliveryTimeRange = {
	start: "9:00:00",
	end: "20:00:00"
};
export const subscribeTimePeriodMax = {
    "30": 6,
    "7": 3
};
export const subscribeDeliveryDays = [
    {text: "Sunday", value: 0},
    // {text: "Monday", value: 1},
    // {text: "Tuesday", value: 2},
    {text: "Wednesday", value: 3},
    {text: "Thursday", value: 4},
    // {text: "Friday", value: 5},
    {text: "Saturday", value: 6},
];


export const storeName = "Opeqe";
export const storeStreetAddress = "395 Santa Monica Pier";
export const storeCity = "Santa Monica";
export const storeState = "CA";
export const storeZipCode = "90401";
export const taxes = [
	{
		name: "California Tax",
		rate: 0.09
	},
	{
		name: "Tax",
		rate: 0.098
	}
]
export const fairDeliveryDiscount = 0;
export const preprationDevider = 2;
export const tokenExpMonthInterval = 6;
export const serviceFeeAmount = 0;
export const serviceFeePercentage = 0;
export const scheduleMaximumDate = 30;
export const scheduleMinuteInterval = 15;
export const reservationMaximumDate = 365;
export const maxPartySize = 30;

export const noDeliverySupport = false;
export const noFindTableSupport = false;
export const noWaitToBeSeatedSupport = false;

export const phoneNumberConfig = {
	defaultCountry: "us",
	regions: ["north-america"]
};

export const socialLinks = {
	twitter: "https://twitter.com/opeqeinc",
	facebook: "https://facebook.com/opeqe",
	instagram: "https://instagram.com/opeqeinc/",
	youtube: "https://youtube.com/opeqe"
};

export const reserveOccasions = [
	{
		value: "birthday",
		text: "Birthday"
	},
	{
		value: "anniversary",
		text: "Anniversary"
	},
	{
		value: "date_night",
		text: "Date night"
	},
	{
		value: "business_meal",
		text: "Business meal"
	},
	{
		value: "celebration",
		text: "Celebration"
	}
];
