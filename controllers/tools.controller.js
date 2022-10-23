const { ObjectId } = require("mongodb");
const { tools } = require("../fakeData/tools");
const { getDb } = require("../utils/dbConnects");

module.exports.getAllTools = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    let tools;
    const db = getDb();
    if (limit && page) {
      tools = await db
        .collection("tools")
        .find()
        .skip(+limit * page)
        .limit(+limit)
        .toArray();
    } else {
      tools = await db.collection("tools").find().toArray();
    }
    if (!tools.length) {
      return res
        .status(400)
        .json({ success: false, error: "Tools Not Found", tools: [] });
    }
    res.status(200).json({ success: true, message: "Tools Found", tools });
  } catch (error) {
    next(error);
  }
};

module.exports.saveTool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection("tools").insertOne(tool);
    if (!result.insertedId) {
      return res.status(400).json({
        success: false,
        error: "Something went wrong",
        tools: { insertedId: null },
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully Inserted Data",
      tools: { insertedId: result.insertedId },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!id) {
      res.status(503).json({ success: false, error: "id Not Found" });
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });
    if (!tool.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Tool Item Not Found", tools: null });
    }
    res.status(200).json({
      success: true,
      message: "Tool Founded",
      tools: tool,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.tool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!id) {
      res.status(503).json({ success: false, error: "id Not Found" });
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
    if (!tool) {
      return res
        .status(400)
        .json({ success: false, error: "Tool Item Not Found", tools: null });
    }
    res.status(200).json({
      success: true,
      message: "Tool Founded",
      tools: tool,
    });
  } catch (error) {
    next(error);
  }
};
