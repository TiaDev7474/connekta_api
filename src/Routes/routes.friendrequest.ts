const requestRouter = require('express').Router();
const  requestController = require('../Controller/controller.friendrequest');


requestRouter.get('/',  requestController.getAll)
requestRouter.post('/send',  requestController.sendOne);
requestRouter.put('/:requestId/accept', requestController.acceptOne);
requestRouter.put('/:requestId/decline',  requestController.declineOne);
requestRouter.delete('/:requestId/delete',  requestController.deleteOne);

module.exports =  requestRouter