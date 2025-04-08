const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let data = req.body
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST" && req.method !== "OPTIONS") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/843a9500-250d-4677-b8a0-3702fe48566c/startTrigger",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_60bf736a272a46d9b3187e7359b0d692"
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error en proxy:", error.response?.data || error.message);
        res.status(500).json({
            error: "Error al comunicarse con Retool",
            details: error.response?.data || error.message
        });
    }
};