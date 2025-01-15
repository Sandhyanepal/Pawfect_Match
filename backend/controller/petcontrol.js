const Pet = require("../model/petmodel");
const Breed = require("../model/breedmodel");

// Add Pets
exports.addPet = async (req, res) => {
  try {
    // console.log(
    //   req.body.name,
    //   req.body.age,
    //   req.body.gender,
    //   req.body.breed,
    //   req.body.category,
    //   req.body.address,
    //   req.body.owner,
    //   req.body.vaccination_status,
    //   req.body.health_issue,
    //   req.body.medication,
    //   req.file?.path.replace(/\\/g, "/"),
    //   req.body?.description
    // );
    let pet = await Pet.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      breed: req.body.breed,
      category: req.body.category,
      address: req.body.address,
      owner: req.body.owner,
      vaccination_status: req.body.vaccination_status,
      health_issue: req.body.health_issue,
      medication: req.body.medication,
      image: req.file?.path.replace(/\\/g, "/"),
      description: req.body?.description,
    });
    // If pet creation fails, return an error
    if (!pet) {
      return res
        .status(400)
        .json({ error: "Something went wrong. Could not add pet." });
    }
    // Return the newly created pet as a response
    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ error: "Server error. Could not add pet." });
  }
};

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate("owner", "orgName") // Populate owner with 'name' only
      .populate("category", "category_name");
    res.status(200).json({
      success: true,
      message: "Pets fetched successfully",
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
      error: error.message,
    });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    await Pet.findByIdAndDelete(id);
    return res.json({ msg: "pet Delted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const path = require("path");
const fs = require("fs");

exports.editPet = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPet = await Pet.findById(id);
    if (!existingPet)
      return res.status(404).json({ message: "Pet not found!" });

    const updatedData = { ...req.body };

    if (req.file) {
      if (existingPet.image) {
        const oldImagePath = path.join(__dirname, "../", existingPet.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updatedData.image = req.file.path;
    } else {
      updatedData.image = existingPet.image;
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedPet)
      return res.status(400).json({ message: "Failed to update pet!" });

    res
      .status(200)
      .json({ message: "Pet updated successfully!", data: updatedPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred!", error: error.message });
  }
};

// Get single pet by ID
exports.getSinglePet = async (req, res) => {
  try {
    const petId = req.params.id;

    // Fetch the pet by ID and populate references
    const pet = await Pet.findById(petId)
      .populate("owner", "orgName") // Populate owner with 'orgName'
      .populate("category", "category_name"); // Populate category with 'category_name'
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet fetched successfully",
      data: pet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pet",
      error: error.message,
    });
  }
};
const Category = require("../model/categorymodel"); // Assuming you have a Category model

// Add Pets
exports.addPet = async (req, res) => {
  try {
    let pet = await Pet.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      breed: req.body.breed,
      category: req.body.category,
      address: req.body.address,
      owner: req.body.owner,
      vaccination_status: req.body.vaccination_status,
      health_issue: req.body.health_issue,
      medication: req.body.medication,
      image: req.file?.path.replace(/\\/g, "/"),
      description: req.body?.description,
    });

    if (!pet) {
      return res
        .status(400)
        .json({ error: "Something went wrong. Could not add pet." });
    }

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Could not add pet." });
  }
};

// Function to fetch dynamic breed mapping

exports.suggestPets = async (req, res) => {
  try {
    const userPreferences = {
      age: req.query.age || null,
      gender: req.query.gender || null,
      breed: req.query.breed || null,
      category: req.query.category || null,
      vaccination_status: req.query.vaccination_status || null,
    };

   

    // Fetch breed and category data dynamically from the database
    const breedMapping = await getBreedMapping();
    const categoryMapping = await getCategoryMapping();

    // Normalize user preferences into a vector using dynamic breed and category mappings
    const userVector = await normalizeFeatures(
      userPreferences,
      breedMapping,
      categoryMapping
    );


    // Fetch all pets from the database
    const pets = await Pet.find()
      .populate("category", "category_name") // Ensure category is populated
      .populate("owner", "orgName");

    // Normalize pet features into vectors and compute similarity
    const results = pets
      .map((pet) => {
        const petCategory = pet.category ? pet.category.category_name : null;

        const petVector = normalizeFeatures(
          {
            age: pet.age,
            gender: pet.gender,
            breed: pet.breed,
            category: petCategory,
            vaccination_status: pet.vaccination_status,
          },
          breedMapping,
          categoryMapping
        );



        const similarity = calculateCosineSimilarity(userVector, petVector);



        return { pet, similarity };
      })
      .filter((result) => result !== null); // Filter out invalid results


    // Sort pets by similarity in descending order
    results.sort((a, b) => b.similarity - a.similarity);

    res.status(200).json({
      success: true,
      message: "Pets suggested based on preferences",
      data: results.map((r) => ({
        pet: r.pet,
        similarity: r.similarity,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to suggest pets",
      error: error.message,
    });
  }
};

// Fetch all breed data dynamically and map them
const getBreedMapping = async () => {
  const breeds = await Breed.find();
  const breedMapping = {};
  breeds.forEach((breed, index) => {
    breedMapping[breed.breed_name] = index + 1; // Map breed name to an ID (index + 1)
  });
  return breedMapping;
};

// Fetch all category data dynamically and map them
const getCategoryMapping = async () => {
  const categories = await Category.find();
  const categoryMapping = {};
  categories.forEach((category, index) => {
    categoryMapping[category.category_name] = index + 1; // Map category name to an ID (index + 1)
  });
  return categoryMapping;
};

// Normalize user preferences and pet features
const normalizeFeatures = (features, breedMapping, categoryMapping) => {
  return [
    features.age ? features.age / 10 : 0,
    features.gender === "male" ? 1 : 0,
    features.breed ? breedMapping[features.breed] || 0 : 0,
    features.category ? categoryMapping[features.category] || 0 : 0,
    // features.vaccination_status === "vaccinated" ? 1 : 0,
  ];
};

// Function to calculate cosine similarity
const calculateCosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};
