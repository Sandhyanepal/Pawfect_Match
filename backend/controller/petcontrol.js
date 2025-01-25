const Pet = require('../model/petmodel')
const Breed = require('../model/breedmodel')
const Meetform = require('../model/meetformmodel')
const Category = require('../model/categorymodel')

const path = require('path')
const fs = require('fs')
const petmodel = require('../model/petmodel')

// Add Pets
exports.addPet = async (req, res) => {
  try {
    const { name, age, gender, breed, category, address, owner, vaccination_status, health_issue, medication, description } = req.body;

    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Create the pet
    const pet = await Pet.create({
      name,
      age,
      gender,
      breed,
      category,
      address,
      owner,
      vaccination_status,
      health_issue,
      medication,
      image: req.file?.path.replace(/\\/g, "/"),
      description,
    });

    if (!pet) {
      return res.status(400).json({ error: "Something went wrong. Could not add pet." });
    }

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Could not add pet." });
  }
};

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({petStatus:true})
      .populate('owner', 'orgName')
      .populate('category', 'category_name')
      console.log(pets)
    res.status(200).json({
      success: true,
      message: 'Pets fetched successfully',
      data: pets,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pets',
      error: error.message,
    })
  }
}

// Delete a pet
exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params
    await Pet.findByIdAndDelete(id)
    return res.json({ msg: 'Pet deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

// Edit a pet
exports.editPet = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPet = await Pet.findById(id);
    if (!existingPet) return res.status(404).json({ message: "Pet not found!" });

    const updatedData = { ...req.body };

    // Handle image update
    if (req.file) {
      if (existingPet.image) {
        const oldImagePath = path.join(__dirname, "../", existingPet.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updatedData.image = req.file.path;
    } else {
      updatedData.image = existingPet.image;
    }

    // Update the pet
    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("category", "category_name") // Populate category
      .populate("breed", "breed_name"); // Populate breed

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

exports.getSinglePet = async (req, res) => {
  try {
    const petId = req.params.id;

    // Fetch the pet by ID and populate references
    const pet = await Pet.findById(petId)
      .populate("owner", "orgName")
      .populate("category", "category_name")
      .populate("breed", "breed_name"); // Populate breed if needed

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
// Suggest Pets Function
// exports.suggestPets = async (req, res) => {
//   try {
//     // Step 1: Fetch the single pet using the id provided
//     const pet = await Pet.findById(req.params.id)
//       .populate('category', 'category_name')
//       .populate('owner', 'orgName');

//     if (!pet) {
//       throw new Error('Pet not found');
//     }

//     console.log('Target Pet:', pet);

//     // Step 2: Extract the breed name from the single pet
//     const petBreedName = pet.breed;

//     // Step 3: Fetch all meet forms where breed matches the extracted breed
//     const meetFormsWithSameBreed = await Meetform.find().populate({
//       path: 'petId',
//       match: { breed: petBreedName }, // Filter the populated `Pet` documents by `breed`
//     });

//     console.log('Meet forms with same breed:', meetFormsWithSameBreed);

//     // Step 4: Extract and make a list of all the phone numbers (phoneNumberList)
//     const phoneNumberList = meetFormsWithSameBreed.map(
//       (form) => form.phoneNumber
//     );

//     console.log('Phone numbers list:', phoneNumberList);

//     // Step 5: Fetch all meet forms with conditions:
//     // 1. Where phoneNumberList includes meet me form phoneNumber
//     // 2. Where breed is not equal to the extracted breed
//     const relatedMeetForms = await Meetform.find({
//       phoneNumber: { $in: phoneNumberList },
//     }).populate({
//       path: 'petId', // Populate `petId` from the `Pet` schema
//       select: 'breed', // Only select the `breed` field from the `Pet` schema
//     });

//     console.log('Related meet forms:', relatedMeetForms);

//     // Step 6: From the meet form list, extract the top 3 breed names based on repetition
//     const breedCountMap = {};
//     relatedMeetForms.forEach((form) => {
//       const breedName = form?.petId?.breed || '';
//       if (breedName !== petBreedName) {
//         breedCountMap[breedName] = (breedCountMap[breedName] || 0) + 1;
//       }
//     });

//     console.log('Breed count map:', breedCountMap);

//     const topBreeds = Object.entries(breedCountMap)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 3)
//       .map(([breed]) => breed);

//     console.log('Top breeds:', topBreeds);

//     // Step 7: Fetch the latest or random pets using the top 3 repeated breed names
//     const collaborativePets = await Pet.find({ breed: { $in: topBreeds } })
//       .populate('category', 'category_name') // Populate category
//       .populate('owner', 'orgName')
//       .sort({ createdAt: -1 }) // Fetch the latest pets
//       .limit(3); // Limit to 3 recommendations

//     console.log('Collaborative pets:', collaborativePets);

//     // Step 8: Content-Based Filtering (Cosine Similarity)
//     const petPreferences = {
//       age: pet.age || null,
//       gender: pet.gender || null,
//       breed: pet.breed || null,
//       category: pet.category || null,
//       vaccination_status: pet.vaccination_status || null,
//     };

//     console.log('Pet preferences:', petPreferences);

//     // Fetch breed and category data dynamically from the database
//     const breedMapping = await getBreedMapping();
//     const categoryMapping = await getCategoryMapping();

//     console.log('Breed mapping:', breedMapping);
//     console.log('Category mapping:', categoryMapping);

//     // Normalize user preferences into a vector using dynamic breed and category mappings
//     const userVector = normalizeFeatures(
//       petPreferences,
//       breedMapping,
//       categoryMapping
//     );

//     console.log('User vector:', userVector);

//     // Fetch all pets from the database
//     const pets = await Pet.find()
//       .populate('category', 'category_name') // Ensure category is populated
//       .populate('owner', 'orgName');

//     // Normalize pet features into vectors and compute similarity
//     const results = pets
//       .map((pet) => {
//         const petCategory = pet.category ? pet.category.category_name : null;

//         const petVector = normalizeFeatures(
//           {
//             age: pet.age,
//             gender: pet.gender,
//             breed: pet.breed,
//             category: petCategory,
//             vaccination_status: pet.vaccination_status,
//           },
//           breedMapping,
//           categoryMapping
//         );

//         console.log('Pet vector:', petVector);

//         const similarity = calculateCosineSimilarity(userVector, petVector);

//         console.log('Similarity score:', similarity);

//         // Filter out pets with undefined or zero similarity
//         if (!similarity || similarity === 0) return null;

//         return { pet, similarity };
//       })
//       .filter((result) => result !== null); // Filter out invalid results

//     console.log('Content-based results:', results);

//     // Sort pets by similarity in descending order
//     const contentPets = results
//       .sort((a, b) => b.similarity - a.similarity)
//       .slice(0, 2)
//       .map((result) => ({
//         ...result.pet.toObject(),
//         similarity: result.similarity,
//         type: 'content-based',
//       }));

//     console.log('Top content-based pets:', contentPets);

//     // Add similarity scores to collaborative results
//     const collaborativeResults = collaborativePets.map((colPet) => {
//       // Calculate collaborative similarity based on breed popularity
//       const maxCount = Math.max(...Object.values(breedCountMap));
//       const breedCount = breedCountMap[colPet.breed] || 0;
//       const similarity = breedCount / maxCount; // Normalize to 0-1 range

//       return { ...colPet.toObject(), similarity, type: 'collaborative' };
//     });

//     console.log('Collaborative results with similarity:', collaborativeResults);

//     // Combine both results
//     const combinedResults = [
//       ...contentPets,
//       ...collaborativeResults.filter(
//         (colPet) => !contentPets.some((cPet) => cPet._id.equals(colPet._id))
//       ),
//     ];

//     console.log('Combined results:', combinedResults);

//     res.status(200).json({
//       success: true,
//       message: 'Pets suggested based on preferences',
//       data: combinedResults,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to suggest pets',
//       error: error.message,
//     });
//   }
// };
exports.suggestPets = async (req, res) => {
  try {
    // Step 1: Fetch the single pet using the id provided
    const pet = await Pet.findOne({id:req.params.id,petStatus:true})
      .populate('category', 'category_name')
      .populate('owner', 'orgName')

    if (!pet) {
      throw new Error('Pet not found')
    }

    console.log('Target Pet:', pet)

    // Step 2: Extract the breed name and category from the single pet
    const petBreedName = pet.breed
    const petCategoryName = pet.category?.category_name

    console.log('Target Pet Breed:', petBreedName)
    console.log('Target Pet Category:', petCategoryName)

    // Step 3: Fetch all pets from the database
    const pets = await Pet.find()
      .populate('category', 'category_name')
      .populate('owner', 'orgName')

    // Step 4: Filter pets by category (e.g., only dogs if the user prefers dogs)
    const filteredPets = pets.filter((p) => {
      return p.category?.category_name === petCategoryName
    })

    console.log('Filtered Pets (by category):', filteredPets)

    // Step 5: Fetch breed and category mappings
    const breedMapping = await getBreedMapping()
    const categoryMapping = await getCategoryMapping()

    console.log('Breed mapping:', breedMapping)
    console.log('Category mapping:', categoryMapping)

    // Step 6: Normalize user preferences into a vector
    const petPreferences = {
      age: pet.age || null,
      gender: pet.gender || null,
      breed: pet.breed || null,
      category: petCategoryName || null,
    }

    console.log('Pet preferences:', petPreferences)

    const userVector = normalizeFeatures(
      petPreferences,
      breedMapping,
      categoryMapping
    )

    console.log('User vector:', userVector)

    // Step 7: Normalize pet features into vectors and compute similarity (Content-Based Filtering)
    const results = filteredPets
      .map((pet) => {
        const petCategory = pet.category ? pet.category.category_name : null

        const petVector = normalizeFeatures(
          {
            age: pet.age,
            gender: pet.gender,
            breed: pet.breed,
            category: petCategory,
          },
          breedMapping,
          categoryMapping
        )

        console.log('Pet vector:', petVector)

        const similarity = calculateCosineSimilarity(userVector, petVector)

        console.log('Similarity score:', similarity)

        // Filter out pets with undefined, zero similarity, or exact match (similarity === 1)
        if (!similarity || similarity === 0 || similarity === 1) return null

        return { pet, similarity }
      })
      .filter((result) => result !== null) // Filter out invalid results

    console.log('Content-based results:', results)

    // Sort pets by similarity in descending order
    const contentPets = results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(1, 3)
      .map((result) => ({
        ...result.pet.toObject(),
        similarity: result.similarity,
        type: 'content-based',
      }))

    console.log('Top content-based pets:', contentPets)

    // Step 8: Collaborative Filtering
    const meetFormsWithSameBreed = await Meetform.find().populate({
      path: 'petId',
      match: { breed: petBreedName }, // Filter the populated `Pet` documents by `breed`
    })

    console.log('Meet forms with same breed:', meetFormsWithSameBreed)

    const phoneNumberList = meetFormsWithSameBreed.map(
      (form) => form.phoneNumber
    )

    console.log('Phone numbers list:', phoneNumberList)

    const relatedMeetForms = await Meetform.find({
      phoneNumber: { $in: phoneNumberList },
    }).populate({
      path: 'petId', // Populate `petId` from the `Pet` schema
      select: 'breed', // Only select the `breed` field from the `Pet` schema
    })

    console.log('Related meet forms:', relatedMeetForms)

    const breedCountMap = {}
    relatedMeetForms.forEach((form) => {
      const breedName = form?.petId?.breed || ''
      if (breedName !== petBreedName) {
        breedCountMap[breedName] = (breedCountMap[breedName] || 0) + 1
      }
    })

    console.log('Breed count map:', breedCountMap)

    const topBreeds = Object.entries(breedCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([breed]) => breed)

    console.log('Top breeds:', topBreeds)

    const collaborativePets = await Pet.find({ breed: { $in: topBreeds } })
      .populate('category', 'category_name') // Populate category
      .populate('owner', 'orgName')
      .sort({ createdAt: -1 })
      .limit(3)

    console.log('Collaborative pets:', collaborativePets)

    // Step 9: Add similarity scores to collaborative results
    const collaborativeResults = collaborativePets.map((colPet) => {
      const maxCount = Math.max(...Object.values(breedCountMap))
      const breedCount = breedCountMap[colPet.breed] || 0
      const similarity = breedCount / maxCount // Normalize to 0-1 range

      return { ...colPet.toObject(), similarity, type: 'collaborative' }
    })

    console.log('Collaborative results with similarity:', collaborativeResults)

    // Step 10: Combine both results, excluding exact matches (similarity === 1)
    const combinedResults = [
      ...contentPets,
      ...collaborativeResults.filter(
        (colPet) => !contentPets.some((cPet) => cPet._id.equals(colPet._id)) // Exclude exact matches
      ),
    ]

    console.log('Combined results:', combinedResults)

    res.status(200).json({
      success: true,
      message: 'Pets suggested based on preferences',
      data: combinedResults,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to suggest pets',
      error: error.message,
    })
  }
}
const getBreedMapping = async () => {
  const breeds = await Breed.find()
  const breedMapping = {}
  breeds.forEach((breed, index) => {
    breedMapping[breed.breed_name] = index + 1 // Map breed name to an ID (index + 1)
  })
  return breedMapping
}

// Fetch all category data dynamically and map them
const getCategoryMapping = async () => {
  const categories = await Category.find()
  const categoryMapping = {}
  categories.forEach((category, index) => {
    categoryMapping[category.category_name] = index + 1 // Map category name to an ID (index + 1)
  })
  return categoryMapping
}

// Normalize user preferences and pet features
const normalizeFeatures = (features, breedMapping, categoryMapping) => {
  return [
    features.age ? features.age / 10 : 0,
    features.gender === 'male' ? 1 : 0,
    features.breed ? breedMapping[features.breed] || 0 : 0,
    features.category ? categoryMapping[features.category] || 0 : 0,
  ]
}

// Function to calculate cosine similarity
const calculateCosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0)
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  return dotProduct / (magnitudeA * magnitudeB)
}

exports.updatePetStatus = async(req,res)=>{
  const {id} = req.params;
  const existingPet = await Pet.findById(id);
  console.log(existingPet)
  try {
    const updatedPet = await Pet.findByIdAndUpdate(id,{
      petStatus:0,
    },{new:true})
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    return res.status(200).json({ message: 'Pet status updated successfully', updatedPet });

  } catch (error) {
    console.log(error.response)
    return res.status(500).json({ message: 'Error occurred while updating pet status' });
  }
}