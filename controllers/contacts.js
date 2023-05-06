const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
    const result = await mongo.getConnection().db('web-cse341').collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
};

const getContactById = async (req, res, next) => {
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