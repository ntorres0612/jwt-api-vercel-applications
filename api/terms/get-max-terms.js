const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET" && req.method !== "OPTIONS") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/c27a5e08-c67f-49aa-87f7-34026c745346/startTrigger",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_ecdd4d3a53cb4e89a3ad56e1bbe5ab2d"
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