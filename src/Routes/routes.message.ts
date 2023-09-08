const messageRouter = require('express').Router();
const messageController = require('../Controller/controller.message');

messageRouter.post('/send', messageController.sendOne)
             .delete('/:messageId/delete', messageController.deleteOne)



module.exports = messageRouter