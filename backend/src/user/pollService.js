var pollModel = require('./pollModel');

module.exports.getDataFromDBService = async () => {
  try {
    const result = await pollModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports.createPollDBService = async (pollDetails) => {
  try {
    const pollModelData = new pollModel(pollDetails);
    const result = await pollModelData.save();
    return result;
  } catch (error) {
    throw error;
  }
};
