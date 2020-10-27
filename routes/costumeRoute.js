import express from 'express';

import Costume from '../models/costumeModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/list', async (req, res) =>{

    // Build Filtering Function
    const queryFilterParam = req.query.filterParam ? req.query.filterParam : '';
    function filterCostume(costume){
        switch (queryFilterParam) {
            case 'available':
                return costume.available;
            case 'unavailable':
                return !costume.available;
            default:
                return true;
        }
    };

    // Build Sorting Function
    const querySortOrder = req.query.sortOrder ? req.query.sortOrder : '';
    function alphabeticalComparator(a, b){
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    };
    function ascendingPriceComparator(a, b){return (+a.price) - (+b.price)};
    function descendingPriceComparator(a, b){return (+b.price) - (+a.price)};
    function ratingComparator(a, b){return (+b.rating) - (+a.rating)};
    function likesComparator(a, b){return (+b.numLikes) - (+a.numLikes)};

    const sortOrderSelector = (querySortOrder) =>{
        switch(querySortOrder) {
            case 'alphabetical':
                return alphabeticalComparator;
            case 'high_to_low_price':
                return descendingPriceComparator;
            case 'low_to_high_price':
                return ascendingPriceComparator;
            case 'rating':
                return ratingComparator;
            case 'likes':
                return likesComparator;
            default:
                return undefined;
        }
    };
    const sortOrder = sortOrderSelector(querySortOrder);

    // Send Response
    const costumes = await Costume.find({});
    const filteredCostumes = costumes.filter(filterCostume);
    const sortedCostumes = filteredCostumes.sort(sortOrder);
    res.send(sortedCostumes);
});

router.get('/retrieve/:id', async (req, res) =>{
    const costumeID = req.params.id;
    const costume = await Costume.findById(costumeID);
    if(costume){
        return res.send(costume);
    } else {
        return res.status(404).send({message:'Costume not found.'});
    }
});

router.post('/create', isAuth, isAdmin, async (req, res) =>{
    const costume = new Costume({
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
    const costume = await Costume.findById(costumeID);
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
            return res.status(200).send({ message:'Costume updated.', data:updatedCostume});
        }
        return res.status(500).send({ message:'Error in updating costume.'});
    } else {
        const newCostume = new Costume({
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
    const costume = await Costume.findById(costumeID);
    if(costume){
        const deletedCostume = await costume.delete()
        if(deletedCostume){
            return res.status(200).send({ message:'Costume deleted.', data:deletedCostume});
        }
        return res.status(500).send({ message:'Error in deleting costume.'});
    }
});

export default router;
