import { validationResult } from "express-validator";

const validateDocuments = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        next();
        } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: "lloraras y lloraras en validateDocuments" });
    }
};

export {validateDocuments}