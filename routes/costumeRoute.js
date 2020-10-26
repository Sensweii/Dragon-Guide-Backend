import express from 'express';

import costumeSet from '../models/costumeModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/list', async (req, res) =>{
    const costumes = await costumeSet.find({});
    res.send(costumes);
});

router.get('/retrieve/:id', async (req, res) =>{
    const costumeID = req.params.id;
    const costume = await costumeSet.findById(costumeID);
    if(costume){
        return res.send(costume);
    } else {
        return res.status(404).send({message:'costumeSet not found.'});
    }
});

router.post('/create', isAuth, isAdmin, async (req, res) =>{
    const costume = new costumeSet({
        name: req.body.name,
        image: req.body.image,
        designer: req.body.designer,
        rarity: req.body.rarity,
        price: req.body.price,
        countInStock: req.body.countInStock,
        description: req.body.description
    });
    const newCostume = await costume.save()
    if(newCostume){
        return res.status(201).send({ message:'New costume created.', data:newCostume});
    }
    return res.status(500).send({ message:'Error in creating costume.'});
});

router.put('/update/:id', isAuth, isAdmin, async (req, res) =>{
    const costumeID = req.params.id;
    const costume = await costumeSet.findById(costumeID);
    if(costume){
        costume.name = req.body.name;
        costume.image = req.body.image;
        costume.designer = req.body.designer;
        costume.rarity = req.body.rarity;
        costume.price = req.body.price;
        costume.countInStock = req.body.countInStock;
        costume.description = req.body.description
        const updatedCostume = await costume.save()
        if(updatedCostume){
            return res.status(200).send({ message:'costumeSet updated.', data:updatedCostume});
        }
        return res.status(500).send({ message:'Error in updating costume.'});
    } else {
        const newCostume = new costumeSet({
            name: req.body.name,
            image: req.body.image,
            designer: req.body.designer,
            rarity: req.body.rarity,
            price: req.body.price,
            countInStock: req.body.countInStock,
            description: req.body.description
        });
        const createdCostume = await newCostume.save()
        if(createdCostume){
            return res.status(201).send({ message:'New costume created.', data:createdCostume});
        }
        return res.status(500).send({ message:'Error in creating costume.'});
    }
});

router.delete('/delete/:id', isAuth, isAdmin, async (req, res) =>{
    const costumeID = req.params.id;
    const costume = await costumeSet.findById(costumeID);
    if(costume){
        const deletedCostume = await costume.delete()
        if(deletedCostume){
            return res.status(200).send({ message:'costumeSet deleted.', data:deletedCostume});
        }
        return res.status(500).send({ message:'Error in deleting costume.'});
    }
});

export default router;
