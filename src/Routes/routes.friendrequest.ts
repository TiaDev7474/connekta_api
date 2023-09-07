const requestRouter = require('express').Router();
const  requestController = require('../Controller/controller.friendrequest');


requestRouter.get('/',  requestController.getAll)
requestRouter.post('/send',  requestController.sendOne);
requestRouter.put('/accept', requestController.acceptOne);
requestRouter.put('/accept',  requestController.declineOne);
requestRouter.delete('/:requestId',  requestController.deleteOne)

module.exports =  requestRouter