
const express = require('express');
const app = express()
const { products, people } = require('../content/data')
const logger = require('../logger')
//using express does not required http module
//app.use(express.static('./content'));
app.use(express.json()); //enable server to receive json input as request body
app.use(logger);

const PostapiLogin =  (req, res) => {
    url = req.body;
    if(url) {
        return res.json(`welcom ${url.name}`)
    }
    res.json('invalid')
}

const getApiPeople = (req,res) => { 
    const newPeople = people.map((peopl) => {
        const{id, name, image} = peopl
        return { id, name, image }
    })
   
    res.json(newPeople)   
}

const getApiPeopleId =  (req, res) => {
    const { userRequestID } = req.params;
    const getUserRequest = people.find((peopl) => peopl.id === Number(userRequestID))
    if ( !getUserRequest ) {
        res.status(404).send('please add a request parameter')
    }
    return res
    .status(200).json(getUserRequest)
   
}

const postApiPeople =  (req, res) => {
    const singleRecord = req.body;
    if (!singleRecord) {
        return res.status(404).json({sucess: false, msg: `please add a request body`})

    }
    res.status(201).json({success: true, person:singleRecord})
}

const postApiPeoplePostman = (req,res) => {
    const singleRecord = req.body;
    if (!singleRecord) {
        return res.status(404).json({sucess: false, msg: 'no request body'})
    }
    return res
        .status(200)
        .json({sucess: true, msg: [... people, singleRecord]})
}

const getApiPeopleQuery =  (req, res) => {
    const {search, limit } = req.query;    
    let sortedProduct = [...products]
    if (search) {
        sortedProduct = sortedProduct.filter((product) => {
            return product.name.startsWith(search)
            
        })
    }

    if ( limit ) {
        sortedProduct = sortedProduct.slice(0, Number(limit))
    } 
    if (sortedProduct.length <= 0) {
        return res.status(200).json({sucess: true, msg:`no value to return`})
    } 
    res.status(200).json(sortedProduct)
}

const putApiPeopleId =  (req, res) => {
    const putRecord = req.body;
    const { id } = req.params;
    const person = people.find((person) => person.id === Number(id))
    console.log(person)
    if (!person) {
        return res.status(400).json({sucess: false, msg: `There is no user with ID: ${id}`})
    }

    const newPutRecord = people.map((newperson) => {
        if (newperson.id === Number(id)) {
            newperson.name = putRecord
        }
        return newperson

    })
    res.status(200).json({data:newPutRecord})
}

const deleteApiPeopleId =  (req, res) => {
    const { id } = req.params;
    
    const newId = people.find((person) => person.id === Number(id));
    if (!newId) {
        return res.status(401).json({sucess: false, msg: `${id} is an invalid entry`})
    }
    const newpeople = people.filter((person) => person.id !== Number(id))
    return res.status(200).json(newpeople)


}

    
module.exports = {
    PostapiLogin,
    deleteApiPeopleId,
    putApiPeopleId,
    getApiPeopleQuery,
    postApiPeoplePostman,
    getApiPeople,
    getApiPeopleId,
    postApiPeople,
    
}
