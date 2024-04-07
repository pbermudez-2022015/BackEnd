'use strict'

import Hotel from './hotel.model.js'

export const save = async(req,res)=>{
    try{
        let data = req.body
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send({message: `Registered succesfully, ${hotel.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering hotel', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedHotel = await Hotel.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedHotel) return res.status(401).send({message: 'Hotel not found and not updated'})
        return res.send({message: 'Updated hotel', updatedHotel})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating hotel'})
    }
}

export const deleteU = async (req,res)=>{
    try{
        let { id } = req.params
        let deletedHotel = await Hotel.findOneAndDelete({_id: id})
        if(!deletedHotel) return res.status(404).send({message: 'Hotel not found and not deleted'})
        return res.send({message: `Hotel with name ${deletedHotel.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting hotel'})
    }
}

export const get = async (req,res ) =>{
    try{
        let hotels = await Hotel.find()
        return res.send({hotels})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting hotels' })
    }
}

export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let hotels = await Hotel.find(
            {name: { $regex: new RegExp(search, 'i') } }
        )
        if (hotels.length === 0) {
            return res.status(404).send({ message: 'Hotels not found' });
        }
        if(!hotels) return res.status(404).send({message: 'Hotels not found'})
            return res.send({message: 'Hotels found', hotels})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching hotels'})
    }
}