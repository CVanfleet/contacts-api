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

module.exports = { getContacts, getContactById};