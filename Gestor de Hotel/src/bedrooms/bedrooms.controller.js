'use strict'

import Bedrooms from './bedrooms.model.js'

export const save = async(req,res)=>{
    try{
        let data = req.body
        let bedroom = new Bedrooms(data)
        await bedroom.save()
        return res.send({message: `Registered succesfully, ${bedroom.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering bedroom', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedBedroom = await Bedrooms.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedBedroom) return res.status(401).send({message: 'Bedroom not found and not updated'})
        return res.send({message: 'Updated bedroom', updatedBedroom})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating bedroom'})
    }
}

export const deleteU = async (req,res)=>{
    try{
        let { id } = req.params
        let deletedBedroom = await Hotel.findOneAndDelete({_id: id})
        if(!deletedBedroom) return res.status(404).send({message: 'Bedroom not found and not deleted'})
        return res.send({message: `Bedroom with name ${deletedBedroom.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting bedroom'})
    }
}

export const get = async (req,res ) =>{
    try{
        let bedrooms = await Bedrooms.find()
        return res.send({bedrooms})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting bedrooms' })
    }
}

export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let bedrooms = await Bedrooms.find(
            {name: { $regex: new RegExp(search, 'i') } }
        )
        if (bedrooms.length === 0) {
            return res.status(404).send({ message: 'Bedroom not found' });
        }
        if(!bedrooms) return res.status(404).send({message: 'Bedrooms not found'})
            return res.send({message: 'Bedrooms found', bedrooms})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching bedrooms'})
    }
}