'use strict'

import { Router } from "express"
import { programEvent, updateEvent, cancelEvent, getUserEvent, search } from "./event.controller.js"


const api = Router()

api.post('/programEvent', programEvent)
api.put('/updateEvent/:id', updateEvent)
api.delete('/cancelEvent/:id', cancelEvent)

api.get('/getUserEvent', getUserEvent)
api.post('/search', search)

export default api