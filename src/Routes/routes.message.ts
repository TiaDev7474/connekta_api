const messageRouter = require('express').Router();
const messageController = require('../Controller/controller.message');
const upload = require('../Config/multer');

messageRouter.post('/:conversationId/send',upload.single('file'), messageController.sendOne)
messageRouter.delete('/:conversationId/:messageId/delete', messageController.deleteOne)



module.exports = messageRouter