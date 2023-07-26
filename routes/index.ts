import { Router , Request, Response} from "express";
import { EmployeeController } from "../controllers/EmployeeController";
const router = Router();
router.get('/', (req: Request, res: Response) => {
   res.render('home')
  });
router.get('/all', EmployeeController.getAllEmployees )
router.get('/tree/:name', EmployeeController.getTreeByName)
export default router;