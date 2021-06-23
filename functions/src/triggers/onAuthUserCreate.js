exports.onAuthUserCreate = async (db, user) => {
    const userId = user.uid;
    const userRef = db.collection('users').doc(userId);
    return userRef.set({
        uid: userId,
        email:user.email
    }, {
        merge: true
    });

}