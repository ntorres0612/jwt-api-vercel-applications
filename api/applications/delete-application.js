const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const id = req.query.id;
    console.log("reqquery", req.query)
    console.log("id", id)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "DELETE" && req.method !== "OPTIONS") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/f8ddd626-359c-4a77-b8e3-7dcd3a2789f8/startTrigger",
            { id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_f160a39fcedf4737b629ca22eca64ef5"
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