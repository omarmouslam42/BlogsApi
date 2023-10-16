import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import postRouter from './modules/post/post.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'


const initApp = (app, express) => {
    app.use(express.json())
    app.get("/", (req, res, next) => {
        return res.status(200).json({message:"Welcome to Blog App"})
    })
    app.use(`/auth`, authRouter)
    app.use(`/post`, postRouter)

    app.all('*', (req, res, next) => {
        res.status(200).send("In-valid Routing , check url  or  method ")
    })
    app.use(globalErrorHandling)

    connectDB()

}

export default initApp