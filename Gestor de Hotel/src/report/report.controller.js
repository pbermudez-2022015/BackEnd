'use strict'


import Hotel from '../hotel/hotel.model.js';

// Función para generar informe sobre la demanda de hoteles

export const generateHotelDemandReport = async (req, res) => {
    try {
        // Obtener hoteles más solicitados (simulado) y seleccionar solo los campos necesarios
        const mostRequestedHotels = await Hotel.find().sort({ totalReservations: -1 }).limit(10).select('-_id name description address phone');

        // Obtener ocupación de habitaciones por hotel
        const occupancyByHotel = mostRequestedHotels.map(hotel => ({
            hotelName: hotel.name,
            totalOccupiedRooms: hotel.occupiedRooms // Suponiendo que tienes un campo occupiedRooms en tu modelo de hotel
        }));

        return res.send({
            message: 'Demand report generated successfully',
            mostRequestedHotels,
            occupancyByHotel
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error generating demand report' });
    }
};


export const generateReservationStatsReport = async (req, res) => {
    try {
        // Obtener todas las reservaciones de todos los hoteles (simulado)
        const allReservations = await Hotel.aggregate([
            { $group: { _id: "$_id", reservations: { $push: "$reservations" } } }
        ]);

        return res.send({
            message: 'Reservation statistics report generated successfully',
            allReservations
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error generating reservation statistics report' });
    }
};


export const searchHotels = async (req, res) => {
    try {
        const { letter } = req.body;

        // Validar la presencia y formato correcto del parámetro 'letter'
        if (!letter || typeof letter !== 'string' || letter.length < 1 || !letter.match(/[a-zA-Z]/)) {
            return res.status(400).send({ message: 'Please provide at least one alphabetic character for search' });
        }

        // Buscar hoteles cuyo nombre contenga la letra o cadena proporcionada
        const hotels = await Hotel.find({ name: { $regex: letter, $options: 'i' } }, { _id: 0, name: 1, description: 1, addres: 1, phone: 1 });

        // Manejar el caso en el que no se encuentren hoteles que coincidan con la búsqueda
        if (hotels.length === 0) {
            return res.status(404).send({ message: `No hotels found with name containing '${letter}'` });
        }

        return res.send({ message: 'Hotels found successfully', hotels });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching hotels' });
    }
};
