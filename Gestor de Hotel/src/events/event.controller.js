'use strict'

import Event from './event.model.js'

export const programEvent = async(req, res) => {
    try{
        let data = req.body
        let event = new Event(data)
        await event.save()
        return res.send({message: `Registered succesfully, ${event.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering event', err: err})
    }
}

export const updateEvent = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedEvent = await Event.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedEvent) return res.status(401).send({message: 'Event not found and not updated'})
        return res.send({message: 'Updated event', updatedEvent})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating event'})
    }
}

export const cancelEvent = async (req,res)=>{
    try{
        let { id } = req.params
        let cancelEvent = await Event.findOneAndDelete({_id: id})
        if(!cancelEvent) return res.status(404).send({message: 'Event not found and not deleted'})
        return res.send({message: `Event with name ${cancelEvent.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting event'})
    }
}

export const getUserEvent = async (req, res) => {
    try {
        const id = req.params.id;

        // Validar si el ID del usuario es válido
        if (!id) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }

        // Buscar los eventos del usuario
        const userEvents = await Event.find({ user: id })
            .populate({ path: 'user', select: 'name' })
            .populate({ path: 'event', select: 'name' });

        // Verificar si se encontraron eventos para el usuario
        if (!userEvents || userEvents.length === 0) {
            return res.status(404).send({ message: 'No events found for this user' });
        }
        return res.status(200).send({ events: userEvents });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error fetching user events', error });
    }
};

export const search = async (req, res) => {
    try {
        let { search } = req.body;
        let events = await Event.find({ name: { $regex: new RegExp(search, 'i') } });
        
        if(events.length === 0) {
            return res.status(404).send({ message: 'Events not found!' });
        }
        
        return res.send({ message: 'Event found!', events });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching events' });
    }
}