import getOrderCondition from "./getOrderCondition";
import scheduleToStr from "../../../functions/scheduleToStr";

export default state => getData(
  state.user.address,
  state.user.deliveryCondition,
);

const getData = (address, delivery) => {
  const isReserve = delivery.type === 'reserve';

  const schedule = scheduleToStr(delivery.schedule)

  const out = {
    type: getOrderCondition(address, delivery),
    deliveryEstimate: address.deliveryEstimate,   
    note: address.note,
    gratuity: 0,
    schedule: schedule,
    size: isReserve ? delivery.reserve.size : 0,
    addressId: address.appAddressId,
    reserve:  isReserve ? delivery.reserve.id : '',
  }

  return out;
}