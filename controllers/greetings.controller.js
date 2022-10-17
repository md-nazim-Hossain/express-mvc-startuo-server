module.exports.getGreetings = (req, res) => {
  res.json({ greetings: "Hello Greetings" });
};

module.exports.saveGreettings = (req, res) => {
  res.json({ greetings: "Save Greetings" });
};
