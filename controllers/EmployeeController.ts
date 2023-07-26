import { Request, Response } from "express";
import { Employee } from "../entity/EmployeeEntity";
import { ResponseEntity } from "../entity/ResponseEntity";
import { EmployeeService } from "../services/EmployeeService";
export class EmployeeController {
  static getAllEmployees(req: Request, res: Response): void {
    const result = EmployeeService.getAll();
    res.json(result);
  }

  static getTreeByName(req: Request, res: Response): void {
    const { name } = req.params;
    const result = EmployeeService.getTree(name);
    if (result) {
      if (result.length > 0) {
        res
          .status(200)
          .json(new ResponseEntity<Employee[]>(true, "Fetched", result));
      } else {
        res
          .status(500)
          .json(
            new ResponseEntity<Employee[]>(
              false,
              "Error, this user doesn't have hierarchy",
              result
            )
          );
      }
    } else {
      res
        .status(404)
        .json(new ResponseEntity<null>(false, `User ${name} not found`));
    }
  }
}
