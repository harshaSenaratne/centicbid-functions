# CenticBids Serverless Functions

Firebase functions for the CenticBids mobile auction application.

## Installation

Once cloned, navigate to functions folder and 
use the npm package manager to install dependencies.

```bash
npm install
```

## Usage
To run the application locally

```python
npm run serve
```


## Note : Every product has a default bidding timeout of 15mins 



## Add Product
To add a product to the firestore, use ```https://us-central1-centicbids-459e0.cloudfunctions.net/addNewProduct
```  url. Please find the sample json file in the ```sample_json``` folder in the root folder.


## Optional


Please find the available product image uri's that is already available in Firebase Storage.

* (Sofa set image) -  ```https://firebasestorage.googleapis.com/v0/b/centicbids-459e0.appspot.com/o/products%2F124365.jpeg?alt=media&token=3a36fdc7-1007-4209-89f4-c562b533696f```

* (Wardrobe image) -  ```https://firebasestorage.googleapis.com/v0/b/centicbids-459e0.appspot.com/o/products%2F9bd119c6ed12f6f15dc5de6b3f505965.png?alt=media&token=ff56636d-a788-4cb8-bfe4-005edc8e44e3```

* (Office desk image) - ```https://firebasestorage.googleapis.com/v0/b/centicbids-459e0.appspot.com/o/products%2F51RQWvkjeKL._SL1500_.jpg?alt=media&token=b593650a-9398-40b7-9977-f6cd1192593d```

* (Bed image) - ```https://firebasestorage.googleapis.com/v0/b/centicbids-459e0.appspot.com/o/products%2Fbed.png?alt=media&token=12e6cd45-a698-4495-89c2-8e0f71dad33a```

* (Chair image) - ```https://firebasestorage.googleapis.com/v0/b/centicbids-459e0.appspot.com/o/products%2Fchair.png?alt=media&token=2aaabdd9-ca68-4ab3-b3e7-44906828b1e0```

   
