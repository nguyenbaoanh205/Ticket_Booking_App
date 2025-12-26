const Event = require("../models/Event");

exports.create = async (req, res) => {
  const event = await Event.create({
    ...req.body,
    availableTickets: req.body.totalTickets
  });
  res.json(event);
};

exports.update = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
};

exports.delete = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ message: "Event deleted successfully" });
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
