<<<<<<< HEAD
const Pet = require('../model/petmodel');
const Breed = require('../model/breedmodel');
const Meetform = require('../model/meetformmodel');
const Category = require('../model/categorymodel');

const path = require('path');
const fs = require('fs');

=======
const Pet = require('../model/petmodel')
const Breed = require('../model/breedmodel')
const Meetform = require('../model/meetformmodel')
const Category = require('../model/categorymodel') // Assuming you have a Category model
const mongoose = require('mongoose')
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

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
      image: req.file?.path.replace(/\\/g, '/'),
      description: req.body?.description,
<<<<<<< HEAD
    });

    if (!pet) {
      return res
        .status(400)
        .json({ error: 'Something went wrong. Could not add pet.' });
    }

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Could not add pet.' });
=======
    })
    // If pet creation fails, return an error
    if (!pet) {
      return res
        .status(400)
        .json({ error: 'Something went wrong. Could not add pet.' })
    }
    // Return the newly created pet as a response
    res.status(200).json({ success: true, data: pet })
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err)
    res.status(500).json({ error: 'Server error. Could not add pet.' })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
  }
}

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
<<<<<<< HEAD
      .populate('owner', 'orgName')
      .populate('category', 'category_name');
=======
      .populate('owner', 'orgName') // Populate owner with 'name' only
      .populate('category', 'category_name')
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
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
<<<<<<< HEAD
    const { id } = req.params;
    await Pet.findByIdAndDelete(id);
    return res.json({ msg: 'Pet deleted successfully' });
=======
    const { id } = req.params
    await Pet.findByIdAndDelete(id)
    return res.json({ msg: 'pet Delted Successfully' })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: 'Something went wrong',
=======
      message: 'Something Went Wrong',
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
      error: error.message,
    })
  }
}

<<<<<<< HEAD
// Edit a pet
exports.editPet = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPet = await Pet.findById(id);
    if (!existingPet) return res.status(404).json({ message: 'Pet not found!' });
=======
const path = require('path')
const fs = require('fs')

exports.editPet = async (req, res) => {
  try {
    const { id } = req.params
    const existingPet = await Pet.findById(id)
    if (!existingPet) return res.status(404).json({ message: 'Pet not found!' })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

    const updatedData = { ...req.body }

    if (req.file) {
      if (existingPet.image) {
<<<<<<< HEAD
        const oldImagePath = path.join(__dirname, '../', existingPet.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
=======
        const oldImagePath = path.join(__dirname, '../', existingPet.image)
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
      }
      updatedData.image = req.file.path
    } else {
      updatedData.image = existingPet.image
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    if (!updatedPet)
<<<<<<< HEAD
      return res.status(400).json({ message: 'Failed to update pet!' });

    res
      .status(200)
      .json({ message: 'Pet updated successfully!', data: updatedPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred!', error: error.message });
=======
      return res.status(400).json({ message: 'Failed to update pet!' })

    res
      .status(200)
      .json({ message: 'Pet updated successfully!', data: updatedPet })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred!', error: error.message })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
  }
}

// Get single pet by ID
exports.getSinglePet = async (req, res) => {
  try {
    const petId = req.params.id

    // Fetch the pet by ID and populate references
    const pet = await Pet.findById(petId)
<<<<<<< HEAD
      .populate('owner', 'orgName')
      .populate('category', 'category_name');
=======
      .populate('owner', 'orgName') // Populate owner with 'orgName'
      .populate('category', 'category_name') // Populate category with 'category_name'
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found',
<<<<<<< HEAD
      });
=======
      })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
    }

    res.status(200).json({
      success: true,
      message: 'Pet fetched successfully',
      data: pet,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pet',
      error: error.message,
    })
  }
<<<<<<< HEAD
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
=======
}

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
      image: req.file?.path.replace(/\\/g, '/'),
      description: req.body?.description,
    })

    if (!pet) {
      return res
        .status(400)
        .json({ error: 'Something went wrong. Could not add pet.' })
    }

    res.status(200).json({ success: true, data: pet })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Could not add pet.' })
  }
}
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

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
<<<<<<< HEAD
  try {
    // Step 1: Fetch the single pet using the id provided
    const pet = await Pet.findById(req.params.id)
      .populate('category', 'category_name')
      .populate('owner', 'orgName');

    if (!pet) {
      throw new Error('Pet not found');
    }

    console.log('Target Pet:', pet);

    // Step 2: Extract the breed name and category from the single pet
    const petBreedName = pet.breed;
    const petCategoryName = pet.category?.category_name;

    console.log('Target Pet Breed:', petBreedName);
    console.log('Target Pet Category:', petCategoryName);

    // Step 3: Fetch all pets from the database
    const pets = await Pet.find()
      .populate('category', 'category_name')
      .populate('owner', 'orgName');

    // Step 4: Filter pets by category (e.g., only dogs if the user prefers dogs)
    const filteredPets = pets.filter((p) => {
      return p.category?.category_name === petCategoryName;
    });

    console.log('Filtered Pets (by category):', filteredPets);

    // Step 5: Fetch breed and category mappings
    const breedMapping = await getBreedMapping();
    const categoryMapping = await getCategoryMapping();

    console.log('Breed mapping:', breedMapping);
    console.log('Category mapping:', categoryMapping);

    // Step 6: Normalize user preferences into a vector
    const petPreferences = {
      age: pet.age || null,
      gender: pet.gender || null,
      breed: pet.breed || null,
      category: petCategoryName || null,
    };

    console.log('Pet preferences:', petPreferences);

    const userVector = normalizeFeatures(
      petPreferences,
      breedMapping,
      categoryMapping
    );

    console.log('User vector:', userVector);

    // Step 7: Normalize pet features into vectors and compute similarity (Content-Based Filtering)
    const results = filteredPets
=======
  // TODO: Find 5 pets for suggestions - 2 from content based filter and 3 from collaborative filter

  // get the id of the single pet

  // ----------- CONTENT BASED FILTER ---------------------

  // get the single pet data using the provide id in the params

  // fetch pets based on the features of the single pet -- use mongoose filtering

  //  OR
  // manually calculate the similarity score using the cosine similarity

  // do not use user preference, because user without login do not have preferences settings, rather user the data from the single pet fetched using the provide id.

  // slice only 2 pets

  // ------------------- COLLABORATIVE FILTER ALGORITHM -----------------------------

  // fetch the single pet using the id provided

  // extract the breed id from the single pet

  // fetch all the meet me form which breedId is matches the extracted breed Id

  // extract and make a list of all the phone numbers (phoneNumberList) of the users from the list of meet me form.

  // fetch all the meet me form with conditions:
  // 1. where phoneNumberList includes meet me form phoneNumber
  // 2. where breedId is not equal to extracted breed Id

  // From the meet me form list, extract top 3 breedId based on repetition.

  // fetch the latest or random pets using the top 3 repeated breedIds.

  try {
    // Step 1: Fetch the single pet using the id provided
    const pet = await Pet.findById(req.params.id)
    if (!pet) {
      throw new Error('Pet not found')
    }

    // Step 2: Extract the breed ID from the single pet
    const petBreedName = pet.breed
    // Step 3: Fetch all meet me forms where breedId matches the extracted breedId
    const meetFormsWithSameBreed = await Meetform.find().populate({
      path: 'petId',
      match: { breed: petBreedName }, // Filter the populated `Pet` documents by `breed`
    })

    // Step 4: Extract and make a list of all the phone numbers (phoneNumberList)
    const phoneNumberList = meetFormsWithSameBreed.map(
      (form) => form.phoneNumber
    )

    // Step 5: Fetch all meet me forms with conditions:
    // 1. Where phoneNumberList includes meet me form phoneNumber
    // 2. Where breedId is not equal to the extracted breedId
    const relatedMeetForms = await Meetform.find({
      phoneNumber: { $in: phoneNumberList },
    }).populate({
      path: 'petId', // Populate `petId` from the `Pet` schema
      select: 'breed', // Only select the `breed` field from the `Pet` schema
    })

    // Step 6: From the meet me form list, extract the top 3 breed IDs based on repetition
    const breedCountMap = {}
    relatedMeetForms.forEach((form) => {
      const breedName = form?.petId?.breed || ''
      if (breedName !== petBreedName) {
        breedCountMap[breedName] = (breedCountMap[breedName] || 0) + 1
      }
    })

    console.log(breedCountMap, 'breedCountMap')

    const topBreeds = Object.entries(breedCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([breed]) => breed)

    // Step 7: Fetch the latest or random pets using the top 3 repeated breed IDs
    const collaborativePets = await Pet.find({ breed: { $in: topBreeds } })
      .populate('category', 'category_name') // Add this line to populate category
      .populate('owner', 'orgName')
      .sort({ createdAt: -1 }) // Fetch the latest pets
      .limit(3) // Limit to 3 recommendations

    // return recommendedPets;

    /// **************************************************************************
    const petPreferences = {
      age: pet.age || null,
      gender: pet.gender || null,
      breed: pet.breed || null,
      category: pet.category || null,
      vaccination_status: pet.vaccination_status || null,
    }

    // Fetch breed and category data dynamically from the database
    const breedMapping = await getBreedMapping()
    const categoryMapping = await getCategoryMapping()

    // Normalize user preferences into a vector using dynamic breed and category mappings
    const userVector = await normalizeFeatures(
      petPreferences,
      breedMapping,
      categoryMapping
    )

    // Fetch all pets from the database
    const pets = await Pet.find()
      .populate('category', 'category_name') // Ensure category is populated
      .populate('owner', 'orgName')

    // Normalize pet features into vectors and compute similarity
    const results = pets
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
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

<<<<<<< HEAD
        console.log('Pet vector:', petVector);

        const similarity = calculateCosineSimilarity(userVector, petVector);

        console.log('Similarity score:', similarity);

        // Filter out pets with undefined, zero similarity, or exact match (similarity === 1)
        if (!similarity || similarity === 0 || similarity === 1) return null;

        return { pet, similarity };
      })
      .filter((result) => result !== null); // Filter out invalid results

    console.log('Content-based results:', results);
=======
        const similarity = calculateCosineSimilarity(userVector, petVector)

        return { pet, similarity }
      })
      .filter((result) => result !== null) // Filter out invalid results
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

    // Sort pets by similarity in descending order
    const contentPets = results
      .sort((a, b) => b.similarity - a.similarity)
<<<<<<< HEAD
      .slice(1, 3)
      .map((result) => ({
        ...result.pet.toObject(),
        similarity: result.similarity,
        type: 'content-based',
      }));

    console.log('Top content-based pets:', contentPets);

    // Step 8: Collaborative Filtering
    const meetFormsWithSameBreed = await Meetform.find().populate({
      path: 'petId',
      match: { breed: petBreedName }, // Filter the populated `Pet` documents by `breed`
    });

    console.log('Meet forms with same breed:', meetFormsWithSameBreed);

    const phoneNumberList = meetFormsWithSameBreed.map(
      (form) => form.phoneNumber
    );

    console.log('Phone numbers list:', phoneNumberList);

    const relatedMeetForms = await Meetform.find({
      phoneNumber: { $in: phoneNumberList },
    }).populate({
      path: 'petId', // Populate `petId` from the `Pet` schema
      select: 'breed', // Only select the `breed` field from the `Pet` schema
    });

    console.log('Related meet forms:', relatedMeetForms);

    const breedCountMap = {};
    relatedMeetForms.forEach((form) => {
      const breedName = form?.petId?.breed || '';
      if (breedName !== petBreedName) {
        breedCountMap[breedName] = (breedCountMap[breedName] || 0) + 1;
      }
    });

    console.log('Breed count map:', breedCountMap);

    const topBreeds = Object.entries(breedCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([breed]) => breed);

    console.log('Top breeds:', topBreeds);

    const collaborativePets = await Pet.find({ breed: { $in: topBreeds } })
      .populate('category', 'category_name') // Populate category
      .populate('owner', 'orgName')
      .sort({ createdAt: -1 }) 
      .limit(3); 

    console.log('Collaborative pets:', collaborativePets);

    // Step 9: Add similarity scores to collaborative results
    const collaborativeResults = collaborativePets.map((colPet) => {
      const maxCount = Math.max(...Object.values(breedCountMap));
      const breedCount = breedCountMap[colPet.breed] || 0;
      const similarity = breedCount / maxCount; // Normalize to 0-1 range

      return { ...colPet.toObject(), similarity, type: 'collaborative' };
    });

    console.log('Collaborative results with similarity:', collaborativeResults);

    // Step 10: Combine both results, excluding exact matches (similarity === 1)
    const combinedResults = [
      ...contentPets,
      ...collaborativeResults.filter(
        (colPet) =>
          !contentPets.some((cPet) => cPet._id.equals(colPet._id)) // Exclude exact matches
      ),
    ];

    console.log('Combined results:', combinedResults);
=======
      .slice(0, 2)

    // Add similarity scores to collaborative results
    const collaborativeResults = collaborativePets.map((colPet) => {
      // Calculate collaborative similarity based on breed popularity
      const maxCount = Math.max(...Object.values(breedCountMap))
      const breedCount = breedCountMap[colPet.breed] || 0
      const similarity = breedCount / maxCount // Normalize to 0-1 range

      return { ...colPet.toObject(), similarity }
    })

    // Combine both results
    const combinedResults = [...contentPets, ...collaborativeResults]
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

    res.status(200).json({
      success: true,
      message: 'Pets suggested based on preferences',
<<<<<<< HEAD
      data: combinedResults,
    });
=======
      // data: results.map((r) => ({
      //   pet: r.pet,
      //   similarity: r.similarity,
      // })),
      data: combinedResults,
    })
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to suggest pets',
      error: error.message,
    })
  }
<<<<<<< HEAD
};
=======
}

// Fetch all breed data dynamically and map them
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
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
<<<<<<< HEAD
    features.gender === 'male' ? 1 : 0, 
    features.breed ? breedMapping[features.breed] || 0 : 0, 
    features.category ? categoryMapping[features.category] || 0 : 0, 
  ];
};
=======
    features.gender === 'male' ? 1 : 0,
    features.breed ? breedMapping[features.breed] || 0 : 0,
    features.category ? categoryMapping[features.category] || 0 : 0,
    // features.vaccination_status === "vaccinated" ? 1 : 0,
  ]
}
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

// Function to calculate cosine similarity
const calculateCosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0)
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

<<<<<<< HEAD
  return dotProduct / (magnitudeA * magnitudeB);
};
=======
  return dotProduct / (magnitudeA * magnitudeB)
}
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
