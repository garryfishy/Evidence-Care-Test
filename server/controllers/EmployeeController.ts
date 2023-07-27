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
    const { result, hierarchy } = EmployeeService.getTree(name);
    console.log(name, "masuk ke si name hit");

    if (!result) {
      res
        .status(404)
        .json(new ResponseEntity<null>(false, `User ${name} not found`, []));
      return;
    }

    const errors: string[] = ["Cannot get hierarchy"];
    const namesWithHierarchy: string[] = [];
    const namesWithMultipleManagers: string[] = [];

    console.log("pass here 1 ================");

    result.forEach((e) => {
      if (e.getManagerId() === 0) {
        namesWithMultipleManagers.push(e.getName());
      } else {
        namesWithHierarchy.push(e.getName());
      }
    });

    console.log(namesWithHierarchy, "pass here 2 ================");

    if (!hierarchy) {
      errors.push(`${namesWithHierarchy.join(", ")} don't have a manager`);
    }

    if (namesWithMultipleManagers.length > 0) {
      namesWithMultipleManagers.forEach((name: string) => {
        const getManagerId = EmployeeService.getByName(name);
        let managers: any[] = [];
        getManagerId.forEach((e) => {
          const managerName = EmployeeService.getById(Number(e.getManagerId()));
          managers.push(managerName?.getName());
        });
        errors.push(`${name} have multiple managers; ${managers.join(", ")}`);
      });
    }

    const status = errors.length > 1 ? 500 : 200;
    const success = errors.length === 1;

    console.log(errors);

    console.log(status, success, "pass here 3 ================");

    res
      .status(status)
      .json(
        new ResponseEntity<Employee[]>(
          success,
          success ? "Fetched" : errors.join(". "),
          result
        )
      );
  }
}
