const ServiceRequest = require("../models/serviceRequest.models");

exports.getAllServiceRequest = (req, res) => {
    try {
        ServiceRequest.find((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving service request"});
        }
        return res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  };

  exports.getServiceRequestById = (req, res) => {
    try {
        ServiceRequest.find({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while retrieving service request"});
        }
         res.status(200).send(data);
      });
    } catch (error) {
      res.status(500).send({message: "Internal Server Error"});
    }
  }

  exports.addServiceRequest = (req, res) => {
    try{
      let serviceRequest = new ServiceRequest(req.body);
      serviceRequest.save((err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while adding a new service request"});
        }
        res.status(201).send({id: data._id, message: "New service request has been added successfully."})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"});
  
    }
  }

  exports.updateServiceRequest = (req, res) => { //using path parameter
    try {
        ServiceRequest.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, data) => {
        if (err) {
          return res.status(400).send({message: "Error while updating an existing service request"})
        }
        res.status(201).send({id: data._id, message: "ServiceRequest has been updated successfully"})
      })
    } catch(error) {
      res.status(500).send({message: "Internal Server Error"})
    }
  }

  exports.deleteServiceRequest = (req, res) => {
    try {
        ServiceRequest.deleteOne({_id: req.params.id}, (err, data) => {
        if(err) {
          return res.status(400).send({message: "Error while deleting an service request"})
        }
        res.status(200).send({message: "ServiceRequest as been deleted successfully"})
      })
    } catch (error) {
      res.status(500).send({message: 'Internal Server Error'});
    }
  }