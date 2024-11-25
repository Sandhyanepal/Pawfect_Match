const Individual = require("../model/individualModel");

const getIndividualUser = async (req, res) => {
  const id = req.body.id;
  const owner = await Individual.findById(id);
  if (owner) {
    return res.status(200).json({ success: true, data: owner });
  }
  return res.status(404).json({ success: false, msg: "lol" });
};
module.exports = { getIndividualUser };
