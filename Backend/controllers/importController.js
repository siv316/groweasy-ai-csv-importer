const { parseCRM } = require("../services/geminiService");

const importCSV = async (req, res) => {
  try {
    const records = req.body;

    const result = await parseCRM(records);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { importCSV };