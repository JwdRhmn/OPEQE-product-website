import produce from "immer";
import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
	[ 
	  state => state.cart.history,
	],
	history => transform(history),
)




const transform = history => {
    const data = mapListToData(history.list);
    return {
        data: data,
        status: getStatus(history.status),
    }
}


const mapListToData = list => {
    const out = {
      upcoming: [],
      recent: [],
    }
console.log('>>>>', list.length, list);
  
    for(let i = 0; i < list.length; i++){
      if(isPast(list[i].status)){
        out.recent.push(
          mapData(
            list[i]
          )
        );
      } else {
        out.upcoming.push(
          mapData(
            list[i]
          )
        );
      }
    }

    return out;
}

const mapData = order =>  {
  const { items } = order;
  const newItems = items.map(
      (item, index) => {
        return {
          id: item.id,
          key: index,
          title: item.title,
          basePrice: item.price,
          image: item.image,
          quantity: item.quantity,
          options: item.options.map( option => {
            return {
              name: option.title,
              price: option.price,
            }
          })
        }
      }
    );

    return produce(order, newOrder => {
      newOrder.items = newItems;
      newOrder.type = order.type.replace(/^Asap/gi, '').toLowerCase();
    });
}


const isPast = status => (
  status !== "isPickedUp"
  &&
  status !== "isSubmitted"
  &&
  status !== "isConfirmed"
  &&
  status !== "isPrepared"
  &&
  status !== "isDelayed"
)



// let id : UUID
// let quantity : Int
// let image : String
// let price : Double
// let tax : Double
// let date : String
// let total : Double
// let paymentMethod : String
// let paymentInformation : String
// let items : [HistoryOrderItem]
// let discount :  [HistoryOrderDiscount]
// let fee : HistoryOrderFee
// let delivery : HistoryOrderDelivery
// let type : String
// let status : String