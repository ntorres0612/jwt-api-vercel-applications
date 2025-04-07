const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    const data = req.body;

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "PUT" && req.method !== "OPTIONS") {
        return res.status(405).json({ error: "Método no permitido" });
    }


    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/bbe51cf9-caa5-4810-8835-ae3b5c599331/startTrigger",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_0d81193d3dfb450bb9d45b37c16f7dd6"
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