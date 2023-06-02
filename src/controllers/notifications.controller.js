const notification = require("../utils/notifications");

const userModel = require("../models/auth.model");

const notificationOrder = async (req, res) => {
    const {body} = req;
    try {
        const result = await userModel.getUser(body.user_id);
        await notification.send(result.rows[0].token_fcm, {
            title : "Done",
            body : "your order has been accepted by admin",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        });
    }
};

module.exports = {
    notificationOrder
}