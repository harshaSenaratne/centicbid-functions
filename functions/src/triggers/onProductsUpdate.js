const util = require('../util/index');

exports.onProductsUpdate = async (db, snap) => {

  const newValues = snap.after.data();
  const previousValues = snap.before.data();

  //CHECKING PRODUCT NEW BIDS

  if (previousValues.highest_bidder && newValues.highest_bidder && previousValues.highest_bidder.uid !== newValues.highest_bidder.uid &&
    previousValues.highest_bidder.amount < newValues.highest_bidder.amount) {

    const userData = await util.fn.getUserData(previousValues.highest_bidder.uid, db);

    if (userData.data && userData.data.token) {
      await util.fn.sendPushNotification({
        title: '',
        body: '',
        token: userData.data.token
      });
    }

  }
}