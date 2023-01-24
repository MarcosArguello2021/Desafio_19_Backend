import { Router } from "express";
const graphqlRouter = Router();
import {graphqlProductController}  from "../controllers/graphqlController.js";

graphqlRouter.get('/graphql/', graphqlProductController );

export default graphqlRouter;