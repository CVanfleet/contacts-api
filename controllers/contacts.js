const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Get all contacts'
    // #swagger.description = 'This request gets all contacts in the database'

    const result = await mongo.getConnection().db('web-cse341').collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
};

const getContactById = async (req, res, next) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Get contact by id'
    // #swagger.description = 'This request gets an individual contact by id number'
    // #swagger.parameters['id'] = { description: 'Contact id' }

    const contactId = new ObjectId(req.params.id);
    const result = await mongo
        .getConnection()
        .db('web-cse341')
        .collection('contacts').find({_id: contactId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Create a contact'
    // #swagger.description = 'This request creates a new contact'
     /* #swagger.parameters['contact'] = { 
        in: 'body',
        description: 'Contact object',
        required: true,
        schema: {
            $firstname: 'John',
            $lastname: 'Doe',
            $email: 'johndoe@email.com',
            $favoriteColor: 'blue',
            $birthday: '1996-03-12T12:00:00.000Z'
        }

     } */

    const contact = req.body;
    const collection = mongo.getConnection().db("web-cse341").collection("contacts");
    console.log(contact);

    try{
        const result = await collection.insertOne(contact);
        res.send(result).status(204);
    } catch (error) {
        res.status(500).send("Error creating contact: " + error);
    }
};

const updateContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Update contact by Id'
    // #swagger.description = 'This is a request to update a given contact record'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID.',
        required: true,
        type: 'string'
    } 
      #swagger.parameters['contact'] = { 
        in: 'body',
        description: 'Contact object',
        required: true,
        schema: {
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@email.com',
            favoriteColor: 'blue',
            birthday: '1996-03-12T12:00:00.000Z'
        }

     } */

    const contactId = new ObjectId(req.params.id);
    const collection = mongo.getConnection().db("web-cse341").collection("contacts");
    console.log(contactId);

    try {
        const result = await collection.updateOne({_id: contactId}, {$set: req.body});
        res.send(result).status(203);
    } catch (error) {
        res.status(501).send("Error updating contact: " + error);
    }
};

const deleteContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Deletes a given contact'
    // #swagger.description = 'This request deletes a given contact record'
    // #swagger.parameters['id'] = { description: 'Contact id' }

    const contactId = new ObjectId(req.params.id);
    const collection = mongo.getConnection().db("web-cse341").collection("contacts");
    console.log(contactId);

    try {
        const result = await collection.deleteOne({_id: contactId});
        res.status(202).send(`Contact record (${contactId}) was deleted successfully`);
    } catch (error) {
        res.status(502).send(`Something went wrong when trying to delete contact ${contactId}:` + error);
    }
} 

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };