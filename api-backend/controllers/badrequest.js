const badreq = async (req, res) => {
    res.status(400).json({ msg: "Bad request" });
};

module.exports = { badreq };
