import dotenv from 'dotenv';
import  path  from 'path';

dotenv.config({path: path.resolve("config/.env")});
import express from 'express';
import connectionDB from './db/connectionDB.js';
import { AppError } from './utils/AppError.js';
import { globalErrorHandling } from './utils/globalErrorHandler.js';
import * as routers from './src/modules/index.routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: "hello !" });
})

app.use('/users', routers.userRouter);
app.use('/category', routers.categoryRouter);
app.use('/sub-category', routers.subCategoryRouter);
app.use('/brand', routers.brandRouter);
app.use('/product', routers.productRouter);
app.use('/coupon', routers.couponRouter);
app.use('/cart', routers.cartRouter);
app.use('/order', routers.orderRouter);
app.use('/review', routers.reviewRouter);

connectionDB();


app.use('*', (req, res, next) => {
  next(new AppError(`URL not found${req.originalUrl}`, 404));
});

app.use(globalErrorHandling);


app.listen(port, () => console.log(`Server is running on port ${port}`));
