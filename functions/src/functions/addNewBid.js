const functions = require('firebase-functions');

const addNewBid = async (data, context, db) => {

    const productId = data.productId;
    const amount = parseInt(data.amount);
    const uid = data.uid;

    let productRef;
    let productData;
    const productDocRef = db.collection('products').where("id", "==", productId);

    try {
        const res = await db.runTransaction(async (t) => {
            const productDetails = await t.get(productDocRef);

            await productDetails.forEach(async doc => {
                productRef = db.collection('products').doc(doc.id);
                productData = doc.data();
            });

            if (productData.active) {
                if (productData.highest_bidder) {
                    if (productData.highest_bidder.amount < amount) {
                        let updateObj = {
                            amount,
                            uid,
                        }
                        await t.update(productRef, {
                            highest_bidder: {
                                ...updateObj
                            }
                        }, {
                            merge: true
                        });

                        return {
                            success: true
                        };
                    } else {
                        return {
                            errMsg: 'amount is not greater than existing bid',
                            success: false
                        };
                    }
                } else {

                    let updateObj = {
                        amount,
                        uid,
                    }

                    await t.update(productRef, {
                        highest_bidder: {
                            ...updateObj
                        }
                    }, {
                        merge: true
                    });

                    return {
                        success: true
                    };
                }
            } else {
                return {
                    errMsg: 'auction has over',
                    success: false
                };
            }
        });
        if (res.success) {
            return {
                success: true
            };
        } else {
            return {
                ...res
            };
        }

    } catch (err) {
        functions.logger.error('addNewBid Transaction failure:', err);
        throw new functions.https.HttpsError('unknown', 'Something went wrong!', err);
    }

};

module.exports = addNewBid;