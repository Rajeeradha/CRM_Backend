const Leads = require("../models/leads.models");

exports.getAllLeads = (req, res) => {
    try {
        Leads.find((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving leads"});
        }
        return res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  };

  exports.getLeadById = (req, res) => {
    try {
        Leads.find({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving lead"});
        }
         res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  }

  exports.addLeads = (req, res) => {
    try{
      let leads = new Leads(req.body);
      leads.save((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while adding a new lead"});
        }
        res.status(201).send({id: data._id, message: "New lead has been added successfully."})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"});
  
    }
  }

  exports.updateLeads = (req, res) => { //using path parameter
    try {
        Leads.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, data) => {
        if (err) {
          return res.status(400).send({message: "Error while updating an existing lead"})
        }
        res.status(201).send({id: data._id, message: "Lead has been updated successfully"})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"})
    }
  }

  exports.deleteLeads = (req, res) => {
    try {
        Leads.deleteOne({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while deleting an lead"})
        }
        res.status(200).send({message: "Lead as been deleted successfully"})
      })
    } catch (error) {
      res.status(500).send({message: 'Internal Server Error'});
    }
  }