import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import postRouter from './modules/post/post.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'


const initApp = (app, express) => {
    app.use(express.json())

    

   app.use(`/auth`, authRouter)
   app.use(`/post`, postRouter)
   
    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Plz check url  or  method ")
    })
    app.use(globalErrorHandling)

    connectDB()

}

export default initApp