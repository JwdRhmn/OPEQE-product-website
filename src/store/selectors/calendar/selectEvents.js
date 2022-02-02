import produce from "immer";
import { createSelector } from 'reselect';


export default createSelector(
  	[ 
		state => state.calendar.events,
  	],
	events => transform(events),
)


const transform = events => {
	const list = mapList(events.list);
	return produce(events, draft => {
		draft.list = list;
	});
}


const mapList = list => list.map(
	({
        id,
		title,
        subTitle,
        description,
        schedule,
        image,
        gallery,
        color,
        start,
        finish,
        capacity,
        price,
        age,
        policy,
        isActive,
        isSoldOut,
	}) => {
		const date = schedule.split('/');

		return {
            id: id,
            day: parseInt( date[1] ),
            month: parseInt( date[0] ),
            year: parseInt( date[2] ),
            date: schedule,
            start: start,
            finish: finish,
            bg: `rgb(${color})`,
            title: title,
            subTitle: subTitle,
            image: image,
    	}
	}
)