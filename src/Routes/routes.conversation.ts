const conversationRouter = require('express').Router();
const conversationController = require('../Controller/controller.conversation');


conversationRouter.get('/:conversationId', conversationController.getMessages);
conversationRouter.get('/', conversationController.getConversationsList);


module.exports = conversationRouter