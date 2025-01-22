const Pet = require('../model/petmodel')
const Breed = require('../model/breedmodel')
const Meetform = require('../model/meetformmodel')
const Category = require('../model/categorymodel') // Assuming you have a Category model
const mongoose = require('mongoose')

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
  }
}

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate('owner', 'orgName') // Populate owner with 'name' only
      .populate('category', 'category_name')
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

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params
    await Pet.findByIdAndDelete(id)
    return res.json({ msg: 'pet Delted Successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: error.message,
    })
  }
}

const path = require('path')
const fs = require('fs')

exports.editPet = async (req, res) => {
  try {
    const { id } = req.params
    const existingPet = await Pet.findById(id)
    if (!existingPet) return res.status(404).json({ message: 'Pet not found!' })

    const updatedData = { ...req.body }

    if (req.file) {
      if (existingPet.image) {
        const oldImagePath = path.join(__dirname, '../', existingPet.image)
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)
      }
      updatedData.image = req.file.path
    } else {
      updatedData.image = existingPet.image
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    if (!updatedPet)
      return res.status(400).json({ message: 'Failed to update pet!' })

    res
      .status(200)
      .json({ message: 'Pet updated successfully!', data: updatedPet })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred!', error: error.message })
  }
}

// Get single pet by ID
exports.getSinglePet = async (req, res) => {
  try {
    const petId = req.params.id

    // Fetch the pet by ID and populate references
    const pet = await Pet.findById(petId)
      .populate('owner', 'orgName') // Populate owner with 'orgName'
      .populate('category', 'category_name') // Populate category with 'category_name'
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found',
      })
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

// Function to fetch dynamic breed mapping

exports.suggestPets = async (req, res) => {
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
      .map((pet) => {
        const petCategory = pet.category ? pet.category.category_name : null

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
        )

        const similarity = calculateCosineSimilarity(userVector, petVector)

        return { pet, similarity }
      })
      .filter((result) => result !== null) // Filter out invalid results

    // Sort pets by similarity in descending order
    const contentPets = results
      .sort((a, b) => b.similarity - a.similarity)
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

    res.status(200).json({
      success: true,
      message: 'Pets suggested based on preferences',
      // data: results.map((r) => ({
      //   pet: r.pet,
      //   similarity: r.similarity,
      // })),
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

// Fetch all breed data dynamically and map them
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
    // features.vaccination_status === "vaccinated" ? 1 : 0,
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

// exports.suggestPets = async (req, res) => {
//   try {
//     // Step 1: Get the reference pet
//     const referencePet = await Pet.findById(req.params.id)
//     if (!referencePet) {
//       throw new Error('Pet not found')
//     }

//     let recommendedPets = []

//     // Try to get recommendations using both methods
//     try {
//       // Get content-based recommendations
//       const contentBasedPets = await getContentBasedRecommendations(
//         referencePet
//       )
//       // Get collaborative recommendations
//       const collaborativePets = await getCollaborativeRecommendations(
//         referencePet
//       )

//       // Combine and deduplicate recommendations
//       recommendedPets = deduplicateAndCombine(
//         contentBasedPets,
//         collaborativePets
//       )
//     } catch (error) {
//       console.error('Error in recommendation algorithms:', error)
//       // If recommendation algorithms fail, fall back to random pets
//       recommendedPets = await getRandomPets(referencePet._id)
//     }

//     // If still no recommendations, get random pets
//     if (!recommendedPets.length) {
//       recommendedPets = await getRandomPets(referencePet._id)
//     }

//     // Ensure we have maximum 5 pets
//     recommendedPets = recommendedPets.slice(0, 5)

//     return res.status(200).json({
//       success: true,
//       message: 'Pets recommended successfully',
//       data: recommendedPets,
//     })
//   } catch (error) {
//     console.error('Error in suggestPets:', error)
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to suggest pets',
//       error: error.message,
//     })
//   }
// }

// // Content-based filtering helper function
// async function getContentBasedRecommendations(referencePet) {
//   // Get breed and category mappings
//   const breedMapping = await getBreedMapping()
//   const categoryMapping = await getCategoryMapping()

//   // Create feature vector for reference pet
//   const referenceVector = normalizeFeatures(
//     {
//       age: referencePet.age,
//       gender: referencePet.gender,
//       breed: referencePet.breed,
//       category: referencePet.category?.category_name,
//       vaccination_status: referencePet.vaccination_status,
//     },
//     breedMapping,
//     categoryMapping
//   )

//   // Get all other pets
//   const allPets = await Pet.find({
//     _id: { $ne: referencePet._id },
//     status: 'available', // Only include available pets
//   })
//     .populate('category', 'category_name')
//     .populate('owner', 'orgName')

//   // Calculate similarities
//   const similarPets = allPets
//     .map((pet) => {
//       const petVector = normalizeFeatures(
//         {
//           age: pet.age,
//           gender: pet.gender,
//           breed: pet.breed,
//           category: pet.category?.category_name,
//           vaccination_status: pet.vaccination_status,
//         },
//         breedMapping,
//         categoryMapping
//       )

//       const similarity = calculateCosineSimilarity(referenceVector, petVector)
//       return { ...pet.toObject(), similarity }
//     })
//     .filter((result) => result.similarity > 0)
//     .sort((a, b) => b.similarity - a.similarity)
//     .slice(0, 2) // Get top 2 similar pets

//   return similarPets
// }

// // Collaborative filtering helper function
// async function getCollaborativeRecommendations(referencePet) {
//   // Get meet forms for the same breed
//   const meetFormsWithSameBreed = await Meetform.find().populate({
//     path: 'petId',
//     match: { breed: referencePet.breed },
//   })

//   // Get phone numbers of users interested in same breed
//   const phoneNumbers = meetFormsWithSameBreed
//     .filter((form) => form.petId) // Filter out null petIds
//     .map((form) => form.phoneNumber)

//   // Get other breeds these users were interested in
//   const relatedMeetForms = await Meetform.find({
//     phoneNumber: { $in: phoneNumbers },
//   }).populate({
//     path: 'petId',
//     select: 'breed',
//   })

//   // Count breed frequencies
//   const breedCounts = {}
//   relatedMeetForms.forEach((form) => {
//     if (form.petId && form.petId.breed !== referencePet.breed) {
//       breedCounts[form.petId.breed] = (breedCounts[form.petId.breed] || 0) + 1
//     }
//   })

//   // Get top 3 breeds
//   const topBreeds = Object.entries(breedCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 3)
//     .map(([breed]) => breed)

//   // Get pets from top breeds
//   const collaborativePets = await Pet.find({
//     _id: { $ne: referencePet._id },
//     breed: { $in: topBreeds },
//     status: 'available',
//   })
//     .populate('category', 'category_name')
//     .populate('owner', 'orgName')
//     .limit(3)

//   // Add normalized similarity scores
//   const maxCount = Math.max(...Object.values(breedCounts))
//   return collaborativePets.map((pet) => ({
//     ...pet.toObject(),
//     similarity: (breedCounts[pet.breed] || 0) / maxCount,
//   }))
// }

// // Function to get random pets when no recommendations found
// async function getRandomPets(excludePetId) {
//   const randomPets = await Pet.aggregate([
//     {
//       $match: {
//         _id: { $ne: new mongoose.Types.ObjectId(excludePetId) },
//         status: 'available',
//       },
//     },
//     { $sample: { size: 5 } },
//   ])

//   // Populate necessary fields and add default similarity
//   const populatedPets = await Pet.populate(randomPets, [
//     { path: 'category', select: 'category_name' },
//     { path: 'owner', select: 'orgName' },
//   ])

//   return populatedPets.map((pet) => ({
//     ...pet,
//     similarity: 0.5, // Default 50% match for random recommendations
//   }))
// }

// // Helper function to deduplicate and combine recommendations
// function deduplicateAndCombine(contentPets, collaborativePets) {
//   const seen = new Set()
//   const combined = []

//   // Helper function to add unique pets
//   const addUniquePet = (pet) => {
//     if (!seen.has(pet._id.toString())) {
//       seen.add(pet._id.toString())
//       combined.push(pet)
//     }
//   }

//   // Add content-based recommendations first
//   contentPets.forEach(addUniquePet)
//   // Then add collaborative recommendations
//   collaborativePets.forEach(addUniquePet)

//   return combined
// }

// // Keep your existing helper functions
// const getBreedMapping = async () => {
//   const breeds = await Breed.find()
//   const breedMapping = {}
//   breeds.forEach((breed, index) => {
//     breedMapping[breed.breed_name] = index + 1
//   })
//   return breedMapping
// }

// const getCategoryMapping = async () => {
//   const categories = await Category.find()
//   const categoryMapping = {}
//   categories.forEach((category, index) => {
//     categoryMapping[category.category_name] = index + 1
//   })
//   return categoryMapping
// }

// const normalizeFeatures = (features, breedMapping, categoryMapping) => {
//   return [
//     features.age ? features.age / 10 : 0,
//     features.gender === 'male' ? 1 : 0,
//     features.breed ? breedMapping[features.breed] || 0 : 0,
//     features.category ? categoryMapping[features.category] || 0 : 0,
//   ]
// }

// const calculateCosineSimilarity = (vectorA, vectorB) => {
//   const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0)
//   const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
//   const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

//   if (magnitudeA === 0 || magnitudeB === 0) {
//     return 0
//   }

//   return dotProduct / (magnitudeA * magnitudeB)
// }
