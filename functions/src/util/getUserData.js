const functions = require('firebase-functions');

const getUserData = async (userId, db) => {
    const userRef = db.collection('users').doc(userId);
    try {
        const userDetails = await userRef.get();
        return {
            data: userDetails.data()
        };

    } catch (err) {
        functions.logger.error('getUserData Transaction failure:', err);
    }

}

module.exports = getUserData;