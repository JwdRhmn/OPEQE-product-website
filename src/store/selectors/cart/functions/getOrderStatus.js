export default (status, isDelivery, orderType) => {
    let out = {
        status: '',
        color: '',
        icon: null,
    };

    switch(status){
        case "issubmitted":
            out.status = "Pending"
            out.color = AppSettings.Colors.LightGreen
        case "isdelayed" :
            out.status = "Delayed"
            out.icon = "InfoBlack"
            out.color = AppSettings.Colors.DarkOrange
        case "isconfirmed":
            out.status = "Preparing your order"
            out.color = AppSettings.Colors.LightGreen
        case "ischarged":
            out.status = "Preparing your order"
            out.color = AppSettings.Colors.LightGreen
        case "isprepared":
            out.status = "Ready for \(OrderType)"
            out.color = AppSettings.Colors.LightGreen
        case "ispickedup":
            if(isDelivery) {
                out.status = "Out for \(OrderType)"
                out.color = AppSettings.Colors.LightGreen
            } else {
                out.status = "Complete"
                out.color = AppSettings.Colors.Green
            }
        case "isdelivered":
            out.status = "Complete"
            out.color = AppSettings.Colors.Green
        case "iscomplete":
            out.status = "Complete"
            out.color = AppSettings.Colors.Green
        case "isready":
            out.status = "Ready"
            out.color = AppSettings.Colors.Green
        case "iscanceledbydriver":
            out.status = "Issue with delivery"
            out.icon = "Ckeckmark"
            out.color = AppSettings.Colors.DarkOrange
        case "iscanceledbycustomer":
            out.status = "Canceled"
            out.icon = "Cancel"
            out.color = AppSettings.Colors.Red
        case "iscanceledbystore":
            out.status = "Canceledd"
            out.icon = "Cancel"
            out.color = AppSettings.Colors.DarkOrange
        case "iscanceled":
            out.status = "Canceled"
            out.icon = "Cancel"
            out.color = AppSettings.Colors.Red
        default:
            out.icon = "QuestionBlack"
            out.color = AppSettings.Colors.DimGray
            out.status = "NA"
        }
    }
}