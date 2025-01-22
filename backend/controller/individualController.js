// const Individual = require("../model/individualModel");

// const getIndividualUser = async (req, res) => {
//   const id = req.body.id;
//   const owner = await Individual.findById(id);
//   if (owner) {
//     return res.status(200).json({ success: true, data: owner });
//   }
//   return res.status(404).json({ success: false, msg: "lol" });
// };
// module.exports = { getIndividualUser };

const Individual = require('../model/individualModel')

const getIndividualUser = async (req, res) => {
  try {
    // const { id } = req.body // Consider using req.params.id if passing via URL
    const { id } = req.params // Consider using req.params.id if passing via URL

    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: 'User ID is required' })
    }

    const owner = await Individual.findById(id)

    if (!owner) {
      return res
        .status(404)
        .json({ success: false, msg: 'Individual user not found' })
    }

    return res.status(200).json({ success: true, data: owner })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Server error', error: error.message })
  }
}

module.exports = { getIndividualUser }
