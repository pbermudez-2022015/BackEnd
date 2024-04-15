'use strict'


import { Router } from "express";
import {generateHotelDemandReport, generateReservationStatsReport, searchHotels } from "./report.controller.js"

const api = Router()

api.get('/demand-report', generateHotelDemandReport); 
api.get('/reservation-stats-report', generateReservationStatsReport);
api.post('/search', searchHotels);



export default api