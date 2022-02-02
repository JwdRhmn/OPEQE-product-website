import { fairDeliveryDiscount } from "../../config/store";

export default (quantity, fee) => {
    if (fairDeliveryDiscount === 0 || quantity === 1) {
        return fee;
    }

    return (fee * quantity) / fairDeliveryDiscount;
}

