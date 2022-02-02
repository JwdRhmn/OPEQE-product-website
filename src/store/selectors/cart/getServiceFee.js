import { 
	serviceFeePercentage,
	serviceFeeAmount,
} from "../../config/store";

export default price => {
    return (price * serviceFeePercentage) + serviceFeeAmount;
}