const {
  CloudTasksClient
} = require('@google-cloud/tasks');

const util = require('../util/index');

exports.onProductCreate = async (admin, db, snap) => {

  const project = process.env.GCLOUD_PROJECT;
  const location = 'us-central1';
  const cloudLocation = 'us-central1';
  const queue = 'productbid-ttl';
  
  const newValue = snap.data();

  if (newValue.bid_end_dt && newValue.active) {
    const endTime = newValue.bid_end_dt.seconds;
    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(project, location, queue);
    const url = `https://${cloudLocation}-${project}.cloudfunctions.net/auctionCallback`;
    const docPath = snap.ref.path;
    const payload = {
      docPath
    };

    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      scheduleTime: {
        seconds: endTime
      }
    }

    await tasksClient.createTask({
      parent: queuePath,
      task
    });

  }
}