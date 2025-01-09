const MeetForm = require("../model/meetformmodel")
const Pet = require("../model/petmodel");
const User = require("../model/usermodel");

//create a new adoption request
exports.createAdoption = async (req,res) =>{
    const {pet, adopter, notes} = req.body;
    try{
        const petExists = await Pet.findById(pet);
        if(!petExists) {
            return res.status(404).json({message: "Pet not found"});
        }
        const adopterExists = await User.findById(adopter);
        if(!adopterExists) {
            return res.status(404).json({message: "Adopter not found"});
        }
        const adoption = new Adoption({
            pet, adopter, notes,
        });
        await adoption.save();
        res.status(201).json({message: "Adoption request created successfully", adoption});
    }
    catch(error){
        res.status(500).json({messag:"Error creating adoption request", error:error.message});
    }
};

//get all adoption request
exports.getAdoption = async (req,res) =>{
    try{
        const adoptions = await Adoption.find()
        .populate("pet", "name breed age")
        .populate("adopter", "name email");
        res.status(200).json(adoptions); 
    }
    catch(error){
        res.status(500).json({message: "Error fetching adoption request", error:error.message});
    }
};

//get a specific adoption request by ID
exports.getAdoptionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const adoption = await Adoption.findById(id)
        .populate("pet", "name breed age")
        .populate("adopter", "name email");
  
      if (!adoption) {
        return res.status(404).json({ message: "Adoption request not found" });
      }
  
      res.status(200).json(adoption);
    } catch (error) {
      res.status(500).json({ message: "Error fetching adoption request", error: error.message });
    }
  };

// Update adoption status
exports.updateAdoptionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const adoption = await MeetForm.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
  
      if (!adoption) {
        return res.status(404).json({ message: "Adoption request not found" });
      }
  
      res.status(200).json({ message: "Adoption status updated successfully", adoption });
    } catch (error) {
      res.status(500).json({ message: "Error updating adoption status", error: error.message });
    }
  };

//delete an adoption request
exports.deleteAdoption = async (req, res) =>{
    const {id} = req.params;
    try{
        const adoption = await MeetForm.findOneAndDelete({petId:id});
        console.log(id)
        console.log(adoption)
        if(!adoption){
            return res.status(404).json({ message: "Adoption request not found" });
        }
        res.status(200).json({ message: "Adoption status deleted successfully", adoption });
        } catch (error) {
          res.status(500).json({ message: "Error deleting adoption status", error: error.message });
    }
};
