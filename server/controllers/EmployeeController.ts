import { Request, Response } from "express";
import { Employee } from "../entity/EmployeeEntity";
import { ResponseEntity } from "../entity/ResponseEntity";
import { EmployeeService } from "../services/EmployeeService";
import { Helpers } from "../helpers";
import { correctExample } from "../json/dummy";
export class EmployeeController {
  static getAllEmployees(req: Request, res: Response): void {
    const { example } = req.params;
    const result = EmployeeService.getAll(example);
    res.json(result);
  }

  static getTreeByName(req: Request, res: Response): void {
    const { name, example } = req.params;

    const checkSpecialCharacters =
      Helpers.containsNumberOrSpecialCharacters(name);
    if (checkSpecialCharacters) {
      res
        .status(500)
        .json(
          new ResponseEntity<null>(
            false,
            "Input cannot contain numbers or special characters",
            []
          )
        );
    }

    let { result, hierarchy, similarName } = EmployeeService.getTree(
      name,
      example
    );
    if (!result) {
      let errorMessage: string = `User ${name} not found`;

      errorMessage =
        similarName!.length > 0
          ? (errorMessage += `, maybe you mean ${similarName?.join(",")}?`)
          : errorMessage;
      res.status(404).json(new ResponseEntity<null>(false, errorMessage, []));
      return;
    }

    const errors: string[] = ["Cannot get hierarchy"];
    const namesWithHierarchy: string[] = [];
    const namesWithMultipleManagers: string[] = [];
    result.forEach((e) => {
      if (e.getManagerId() === 0) {
        namesWithMultipleManagers.push(e.getName());
      } else {
        namesWithHierarchy.push(e.getName());
      }
    });
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
    res
      .status(status)
      .json(
        new ResponseEntity<Employee>(
          success,
          success ? "Fetched" : errors.join(". "),
          result
        )
      );
  }
}
