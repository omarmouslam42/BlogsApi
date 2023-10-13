import { generalFields } from './../../middleware/validation.js';
import  joi  from 'joi';

export const signUpVal = {
    body: joi.object().required().keys({
        userName: generalFields.name,
        email: generalFields.email,
        password: generalFields.password,
        phone: generalFields.phone,
        
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}




export const signInVal = {
    body: joi.object().required().keys({
        email: generalFields.email,
        password: generalFields.password,
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}

export const sendCodeVal = {
    body: joi.object().required().keys({
        email: generalFields.email,
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}

export const ResetCodeVal = {
    body: joi.object().required().keys({
        email: generalFields.email,
        password: generalFields.password,
        code: joi.string().max(6).required()
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}