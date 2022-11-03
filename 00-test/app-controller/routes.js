const express = require('express');
const app = express()
const router = express.Router()
const  {
    PostapiLogin,
    deleteApiPeopleId,
    putApiPeopleId,
    getApiPeopleQuery,
    postApiPeoplePostman,
    getApiPeople,
    getApiPeopleId,
    postApiPeople
    
} = require('./route-controller')


console.log(PostapiLogin)




router.get('/', getApiPeople)
router.post('/', postApiPeople)
router.put('/:id', putApiPeopleId)
router.delete('/:id', deleteApiPeopleId)
router.post('/postman', postApiPeoplePostman)
router.get('/query', getApiPeopleQuery)
router.post('/login', PostapiLogin)
router.get('/:userRequestID',getApiPeopleId)


module.exports = router




