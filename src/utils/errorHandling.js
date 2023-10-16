import { ErrorClass } from "./errorClass.js"


export const asyncHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(error => {
            return next(new ErrorClass(error.message, error.status))
        })
    }
}

export const globalErrorHandling =asyncHandler( (error, req, res, next) => {
    return next(new ErrorClass({ msgError: error.message, stack: error.stack }))
})