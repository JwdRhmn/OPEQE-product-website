import { taxes } from "../../config/store";

export default price => {
    return taxes.map( tax => ({
    	title: tax.name,
    	amount: price * tax.rate
    }));
}