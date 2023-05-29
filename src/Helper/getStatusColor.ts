import { stat } from "fs";
import { SD_Status } from "../Utility/SD";

const getStatusColor = (status: SD_Status) => {
    return status === SD_Status.CONFIRMED ? "primary" : status == SD_Status.PENDING 
    ? "secondary"
    : status === SD_Status.PREPARING_FOR_SENDING
    ? "info" 
    : status === SD_Status.CANCELLED
    ? "danger"
    : status === SD_Status.SENT && "success";


}

export default getStatusColor;