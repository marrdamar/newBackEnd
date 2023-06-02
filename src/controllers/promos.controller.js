const promosModel = require("../models/promos.model");

const getPromos = async (req, res) => {
    try {
        const { query } = req;
        const result = await promosModel.getPromos(query);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: "Data Not Found... please don't do it again",
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

const getPromoDetails = async (req, res) => {
    try {
        const { params } = req;
        const result = await promosModel.getPromoDetails(params);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: `Data ID ${params.promoId} Not Found... please don't do it again`,
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

const addPromo = async (req, res) => {
    try {
        const { body } = req;
        const result = await promosModel.addPromo(body);
        console.log(result)
        console.log(body)
        res.status(201).json({
            msg: "Add Data Promo Success...",
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    } 
};

const editPromo = async (req, res) => {
    try {
        const { params, body } = req;
        const result = await promosModel.editPromo(params, body);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Edit Fail... ID ${params.promoId} Not Found...`,
            });
            return;
        }
        res.status(200).json({
            msg: "Edit Data Promo Success...",
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    }
};

const deletePromo = async (req, res) => {
    try {
        const { params } = req;
        const result = await promosModel.deletePromo(params);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Data ID ${params.promoId} Not Found... please don't do it again !`,
            });
            return;
        }
        res.status(200).json({
            msg: `Delete ID ${params.promoId} Data Promo Success...`,
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

module.exports = {
    getPromos,
    getPromoDetails,
    addPromo,
    editPromo,
    deletePromo
}