const Contacts = require("../models/contacts.models");

exports.getAllContacts = (req, res) => {
    try {
        Contacts.find((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving contacts"});
        }
        return res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  };

  exports.getContactById = (req, res) => {
    try {
        Contacts.find({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving contact"});
        }
         res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  }

  exports.addContacts = (req, res) => {
    try{
      let contacts = new Contacts(req.body);
      contacts.save((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while adding a new contact"});
        }
        res.status(201).send({id: data._id, message: "New contact has been added successfully."})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"});
  
    }
  }

  exports.updateContacts = (req, res) => { //using path parameter
    try {
        Contacts.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, data) => {
        if (err) {
          return res.status(400).send({message: "Error while updating an existing contacts"})
        }
        res.status(201).send({id: data._id, message: "Contact has been updated successfully"})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"})
    }
  }

  exports.deleteContacts = (req, res) => {
    try {
        Contacts.deleteOne({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while deleting an contact"})
        }
        res.status(200).send({message: "Contact as been deleted successfully"})
      })
    } catch (error) {
      res.status(500).send({message: 'Internal Server Error'});
    }
  }