const { tools } = require("../fakeData/tools");

module.exports.getAllTools = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Tools are Founded", data: tools });
};

module.exports.saveTool = (req, res) => {
  const data = req.body;
  tools.push(data);
  res.status(200).json({ success: true, message: "Tool Save Successfully" });
};

module.exports.delete = (req, res) => {
  const { id } = req.query;
  if (id) {
    tools.filter((tool) => tool.id !== Number(id));
    res
      .status(200)
      .json({ success: true, message: "Tool Delete Successfully", data: id });
  } else {
    res.status(503).json({ success: false, error: "id Not Found" });
  }
};

module.exports.tool = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(503).json({ success: false, error: "id Not Found" });
  }
  const tool = tools.find((tool) => tool.id === Number(id));
  if (tool) {
    res.json({ success: true, message: "Tool Founded", data: tool });
  } else {
    res.status(402).res.json({ success: false, error: "Tool Not Founds" });
  }
};
