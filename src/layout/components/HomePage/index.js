import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import queryString from "query-string";

import isMobile from "../../../functions/isMobile";

import toggleFavorite from "../../../store/actions/product/toggleFavorite";
import selectUserData from "../../../store/selectors/user/selectUserData";
import selectGroupedProductItems from "../../../store/selectors/product/selectGroupedProductItems";
import {
	DATA_FETCH_PENDING,
	DATA_FETCH_FULFILLED,
	DATA_FETCH_REJECTED,
	DATA_FETCH_DATA_PROP
} from "../../../store/config/actionNames";

import {
	PRODUCT_PAGE_URL,
	HOME_PAGE_URL,
	ITEM_SEARCH_PAGE_URL
} from "../../config/routing";
import {
	HOME_PAGE_TOP_PROMOTION_PROPS,
	HORIZONTAL_LIST_FRAME_SIZE,
	HOME_PAGE_FOOD_CARD_PROPS,
	HOME_PAGE_SPECIAL_FOOD_CARD_PROPS,
	HOME_PAGE_COUPONS_FOOD_CARD_PROPS,
	HOME_PAGE_HAPPY_HOUR_FOOD_CARD_PROPS,
	HOME_PAGE_FAV_FOOD_CARD_PROPS,
	HOME_PAGE_CATERING_FOOD_CARD_PROPS
} from "../../config/layout";

import Grid from "@material-ui/core/Grid";

import GiftCardPromotion from "../GiftCardPromotion";
import OrderOptionsBar from "../OrderOptionsBar";
import MobileOrderOptionsBar from "../MobileOrderOptionsBar";
import HorizontalListContainer from "../HorizontalListContainer";
import FoodCard from "../FoodCard";
import GroupCard from "../GroupCard";
import PageTopPromotion from "../PageTopPromotion";
import MobileAppPromotion from "../MobileAppPromotion";
import ExtraOrderPromotion from "../ExtraOrderPromotion";

import SpecialDetailsNotification from "../SpecialDetailsNotification";

export function Index(props) {
	const {
		className,
		style,
		status,
		productItems: {
			data: { 
				groups: itemGroups,
				allGroups, 
				feeLabel, 
				deliveryFee 
			},
			status: {
				[DATA_FETCH_PENDING]: itemsLoading,
				[DATA_FETCH_REJECTED]: itemsError,
				[DATA_FETCH_FULFILLED]: itemsFetched
			}
		},
		user: { data: user },
		toggleFavorite,
		history,
		location,
		match,
		staticContext,
		...others
	} = props;

	const breakpoints = {
		xs: 11,
		sm: 11,
		md: 11,
		lg: 11,
		xl: 11
	};

	const [showSpecialDetails, setShowSpecialDetails] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const isSkeleton =
		(!itemGroups.length && (itemsLoading || itemsError)) ||
		!itemGroups.length;

	function itemlabelClick(item) {
		setSelectedItem(item);
		setShowSpecialDetails(true);
	}

	function handleSpecialUse() {
		setShowSpecialDetails(false);
		setTimeout(() => history.push(getItemHref(selectedItem)), 400);
	}

	function handleFav(id, value) {
		toggleFavorite(id);
	}

	const middleOfGroups= parseInt(itemGroups.length / 2);

	return (
		<>
			<SpecialDetailsNotification
				onUse={handleSpecialUse}
				title={selectedItem && selectedItem.special.title}
				description={selectedItem && selectedItem.special.description}
				img={selectedItem && selectedItem.image}
				open={showSpecialDetails}
				onClose={() => setShowSpecialDetails(false)}
			/>
			<div
				className={cn("home-page-l1", { mobile: isMobile })}
				style={{
					...style
				}}
				{...others}
			>
				<PageTopPromotion {...HOME_PAGE_TOP_PROMOTION_PROPS} />
				<div className="plcaholder">&nbsp;</div>
				<div className="page-body">
					{isMobile ? (
						<MobileOrderOptionsBar />
					) : (
						<OrderOptionsBar itemBreakpoints={breakpoints} />
					)}
					<Grid className="page-content" container justify="center">
						<Grid container item {...breakpoints}>
							{groupItems(itemGroups, isSkeleton).map(
								renderHorizontalList({
									isSkeleton,
									itemlabelClick,
									handleFav,
									hideFav: !user.token,
									bottomLabel: feeLabel,
									deliveryFee,
									insertBefore:{
										[middleOfGroups]: (
											<MobileAppPromotion 
												className="app-promotion"
											/>
										)
									}
								})
							)}
							{allGroups.map(
								renderGroupCards
							)}
							<GiftCardPromotion 
								className="gift-card-promotion"
							/>
							{!isMobile && (
								<ExtraOrderPromotion 
									className="extra-order-promotion"
								/>
							)}
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
}

const renderHorizontalList = ({
	isSkeleton,
	itemlabelClick,
	handleFav,
	hideFav,
	bottomLabel,
	deliveryFee,
	insertBefore={}
}) => ({ items, title, subTitle, type: groupType }, index) => {
	if (!items.length) {
		return null;
	}

	return (
		<>
			{insertBefore[index] && insertBefore[index]}
			<HorizontalListContainer
				key={index}
				className="horizontal-list"
				title={title}
				subTitle={subTitle}
				linkTarget="/"
				freeScroll={isMobile}
				frameSize={HORIZONTAL_LIST_FRAME_SIZE}
				skeleton={isSkeleton}
				listProps={{
					listContainerProps: {
						className: "list-container"
					}
				}}
			>
				{items.map((item, index) => {
					const { id, special, feature, ...others } = item;

					let href;
					let filterLinks;
					if(!isSkeleton){
						href = getItemHref(item);
						filterLinks = createFilterLinks(item);
					}

					return (
						<div key={id}>
							<div className="card-container">
								{isSkeleton ? (
									<FoodCard 
										skeleton={true} 
										layoutProps={getFoodCardProps(groupType)}
									/>
								) : (
									<FoodCard
										{...others}
										onLabelClick={() => itemlabelClick(item)}
										onFav={handleFav}
										label={special.title}
										timeRemaining={special.remainingTime}
										href={href}
										subTitle={feature.title}
										subTitleHref={filterLinks.sub}
										categoryHrefs={filterLinks.cat}
										id={id}
										hideFav={hideFav}
										bottomLabel={bottomLabel}
										layoutProps={getFoodCardProps(groupType)}
									/>
								)}
							</div>
						</div>
					);
				})}
			</HorizontalListContainer>
		</>
	);
};

const renderGroupCards = ({ items, title, filterType }, index) => {

	return (
		<HorizontalListContainer
			key={index}
			className="horizontal-list"
			title={title}
			linkTarget="/"
			freeScroll={isMobile}
			frameSize={6}
			listProps={{
				listContainerProps: {
					className: "list-container"
				}
			}}
		>
			{items.map((item, index) => {

				let href = ITEM_SEARCH_PAGE_URL({
					filterTypes: [filterType],
					filterValue: item.title
				});

				return (
					<div key={index}>
						<div className="card-container">
							<GroupCard
								href={href}
								img={item.image}
								text={item.title}
							/>
						</div>
					</div>
				);
			})}
		</HorizontalListContainer>
	);
};


const getFoodCardProps = groupType => {
	switch(groupType){
		case "happyhour": 
			return HOME_PAGE_HAPPY_HOUR_FOOD_CARD_PROPS;
		case "coupon": 
			return HOME_PAGE_COUPONS_FOOD_CARD_PROPS;
		case "special": 
			return HOME_PAGE_SPECIAL_FOOD_CARD_PROPS;
		case "catering": 
			return HOME_PAGE_CATERING_FOOD_CARD_PROPS;
		case "favourite": 
			return HOME_PAGE_FAV_FOOD_CARD_PROPS;
		default: 
			return HOME_PAGE_FOOD_CARD_PROPS;
	}
}

const getItemHref = item => {
	return `/${PRODUCT_PAGE_URL({
        id: item.id,
        category: item.category.title,
        type: item.type.title,
        manufacturer: item.manufacturer.title
    })}`;
};

function groupItems(itemGroups, isSkeleton) {
	let groups = [];
	if (isSkeleton) {
		const items = [];
		for (let i = 0; i < HORIZONTAL_LIST_FRAME_SIZE; i++) {
			items.push({ id: i });
		}
		for (let i = 0; i < 3; i++) {
			groups.push({
				items: items
			});
		}
	} else {
		groups = itemGroups;
	}
	return groups;
}

const createFilterLinks = item => {
	const out = {};
	out.sub = ITEM_SEARCH_PAGE_URL({
		filterTypes: ["featureTitle"],
		filterValue: item.feature.title
	});
	out.cat = item.categories.map(
		category =>
			ITEM_SEARCH_PAGE_URL({
				filterTypes: [category.searchType],
				filterValue: category.text
			}),
		[]
	);

	return out;
};

export default connect(
	state => {
		return {
			productItems: selectGroupedProductItems(state),
			user: selectUserData(state)
		};
	},
	{
		toggleFavorite
	}
)(Index);
