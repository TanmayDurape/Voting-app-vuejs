var pollService = require('./pollService');

var getDataConntrollerfn = async (req, res) =>
{
    var polls = await pollService.getDataFromDBService();
    res.send({ "status": true, "data": polls });
}

var createPollControllerFn = async (req, res) => 
{
    const { question, options, dueDate, visibility } = req.body;
    const pollDetails = { question, options, dueDate, visibility };

    var status = await pollService.createPollDBService(pollDetails);
    var status = await pollService.createPollDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Poll created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating poll" });
    }
}

module.exports = { getDataConntrollerfn, createPollControllerFn};