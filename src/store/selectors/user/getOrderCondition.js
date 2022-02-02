export default (address, delivery) => {

  const isDelivery = delivery.type === 'delivery';
  const isPickup = delivery.type === 'pickup';
  const isReserve = delivery.type === 'reserve';

  if(isPickup || isDelivery){
  	return `${
	    delivery.schedule ? 'Schedule' : 'Asap'
	}${
	    isDelivery ? 'Delivery' : 'PickUp'
	}`;
  }

  if(isReserve){
  	if(delivery.reserve.isWaitlist){
  		return 'Waitlist';
  	} else {
  		return 'Reserve';
  	}
  }

}