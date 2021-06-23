const functions = require('firebase-functions');
const util = require('../util/index');

const auctionCallback = async (req, res, db) => {
    const payload = req.body;
    const productDocRef = db.doc(payload.docPath);

    try {
        const task = await db.runTransaction(async (t) => {
            const productData = await t.get(productDocRef);
            if (productData.data() && productData.data().highest_bidder && productData.active) {
                await t.update(productDocRef, {
                    active: false
                }, {
                    merge: true
                });

                const userData = await util.fn.getUserData(productData.data().highest_bidder.uid, db);

                if (userData.data && userData.data.token) {
                    await util.fn.sendPushNotification({
                      title: '',
                      body: '',
                      token: userData.data.token
                    });
                  }

                return {
                    success: true
                };
            } else {
                
                await t.update(productDocRef, {
                    active:false
                }, {
                    merge: true
                });

                return {
                    success: true
                };
            }

        });
        return res.send((200).toString());
    } catch (err) {
        functions.logger.error('auctionCallback Transaction failure:', err);
        return res.status(500).send(err);
    }
};

module.exports = auctionCallback;