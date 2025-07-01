const express = require('express');
const { createEvent, myEvents, eventDetails, updateEvent, browseEvent, featuredEvents, deleteEvent, filterEventsWithType, searchEvents, upcomingEvents } = require('../controllers/event.controllers');
const userAuthentication = require('../middlewares/userAuth-middleware');
const eventRouter = express.Router();

eventRouter.post('/create-event',userAuthentication, createEvent)
eventRouter.get('/my-events',userAuthentication, myEvents)
eventRouter.get('/event-details/:id',userAuthentication, eventDetails)
eventRouter.put('/update-event/:id',userAuthentication, updateEvent)
eventRouter.delete('/delete-event/:id',userAuthentication, deleteEvent)
eventRouter.get('/browse-events', browseEvent)
eventRouter.get('/featured-events', featuredEvents)
eventRouter.get('/upcoming-events', upcomingEvents)

eventRouter.get('/filter-events',filterEventsWithType)
eventRouter.get('/search-events',searchEvents)

module.exports = eventRouter;