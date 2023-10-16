import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addPostVal = {
    body: joi.object().required().keys({
        title: generalFields.name.required(),
        summary: generalFields.name.required(),
        content: generalFields.name.required()
    }),
    file: generalFields.file.required(),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}

