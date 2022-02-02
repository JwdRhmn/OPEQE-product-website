import { preprationDevider } from "../../config/store";

export default (deliveryTime , preperationTime, quantity) => {
    let out = (preperationTime * quantity) / preprationDevider
    if (deliveryTime) {
        out += deliveryTime
    }
    return parseInt(out);
}