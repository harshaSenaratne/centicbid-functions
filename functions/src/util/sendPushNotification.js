const functions = require('firebase-functions');
const admin = require("firebase-admin");

const sendPushNotification = async (data) => {
    const promises = [];

    promises.push({
        notification: {
            title: data.title,
            body: data.body
        },
        android: {
            notification: {
                sound: 'default'
            },
        },
        apns: {
            payload: {
                aps: {
                    sound: 'default'
                },
            },
        },
        token: data.token
    });
    
    if (promises.length > 0) {
        return await admin.messaging().sendAll(promises)
            .then((response) => {
                functions.logger.info(response.successCount + ' messages were sent successfully');
                return {
                    success: true
                };
            }).catch(err => {
                functions.logger.error('messages were failed =>', err);
            });

    } else {
        return {
            success: false
        };
    }
}

module.exports = sendPushNotification;