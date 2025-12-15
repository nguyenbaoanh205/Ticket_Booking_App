const Event = require("../models/Event");

exports.create = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

exports.getAll = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.getDetail = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
};
