const Breed = require("../model/breedmodel");

exports.addBreed = async (req, res) => {
  let breed = await Breed.create({
    breed_name: req.body.breed_name,
  });
  // breed = await breed.save()
  if (!breed) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(breed);
};

exports.getAllbreed = async (req, res) => {
  try {
    let breed = await Breed.find();
    res.send(breed);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
exports.deleteBreed = async (req, res) => {
  try {
    const breed = await Breed.findByIdAndDelete(req.params.id);
    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }
    res.json({ message: "Breed deleted successfully", breed });
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
