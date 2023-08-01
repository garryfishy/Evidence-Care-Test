import { Router, Request, Response } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Express with typescript by Garry");
});
router.get("/all/:example", EmployeeController.getAllEmployees);
router.get("/tree/:example/:name", EmployeeController.getTreeByName);
export default router;
