const functions = require('firebase-functions');
const admin = require("firebase-admin");

const onAuthUserCreate = require('./src/triggers/onAuthUserCreate');
const onProductsUpdate = require('./src/triggers/onProductsUpdate');
const onProductCreate = require('./src/triggers/onProductCreate');
const auctionCallback = require('./src/functions/auctionCallback');
const addNewBid = require('./src/functions/addNewBid');

// Initialization

admin.initializeApp();
const db = admin.firestore();

/*#####################################

                Functions

#####################################*/

exports.auctionCallback = functions.https.onRequest(async (req, res) => {
  return auctionCallback(req, res, db);
});

exports.addNewBid = functions.https.onRequest(async (req, res) => {
  return addNewBid(req, res, db);
});


/*#####################################

                TRIGGERS

#####################################*/

exports.onAuthUserCreate = functions.auth.user().onCreate(async (user) => {
  await onAuthUserCreate.onAuthUserCreate(db, user);
});


exports.onProductsUpdate = functions.firestore.document('products/{productId}').onUpdate(async (snap, context) => {
  await onProductsUpdate.onProductsUpdate(db, snap);
});


exports.onProductCreate = functions.firestore.document('products/{productId}').onCreate(async (snap, context) => {
  await onProductCreate.onProductCreate(admin, db, snap);
});

/*#####################################

              TEMP Functions

#####################################*/

exports.addNewProduct = functions.https.onRequest(async (req, res) => {
  //Date.parse("2019-01-01T12:30:00.000Z")

  const id = Math.random().toString(36).substring(2)
  const created_dt_timestamp = new Date();
  //Bid time for a product is limited to 15mins 
  const bid_end_dt_timestamp = new Date(created_dt_timestamp.getTime() + (1440 * 60 * 1000));
   
  const productRef = db.collection('products').doc(id);
  await productRef.set({
    active:req.body.active,
    base_price: req.body.base_price,
    current_bid: req.body.current_bid,
    description:req.body.description,
    image_path:req.body.image_path,
    name:req.body.name,
    created_dt:created_dt_timestamp,
    bid_end_dt:bid_end_dt_timestamp,
    id
  }, {
    merge: true
  });
  return res.send({
    success: true
  });
});