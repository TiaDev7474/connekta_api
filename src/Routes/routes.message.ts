const messageRouter = require('express').Router();
const messageController = require('../Controller/controller.message');

messageRouter.post('/:conversationId/message', messageController.sendOne)
             .delete('/:conversationId/message', messageController.deleteOne)



module.exports = messageRouter