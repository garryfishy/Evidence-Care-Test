import { Employee } from "../entity/EmployeeEntity";
import { Helpers } from "../helpers";
import {
  correctExample,
  faultyExample,
  anotherFaultyExamples,
} from "../json/dummy";

let employees: Employee[] = correctExample;

export class EmployeeService {
  static getAll(examples: string): Employee[] {
    employees =
      examples === "correct"
        ? correctExample
        : examples === "faulty"
        ? faultyExample
        : anotherFaultyExamples;
    return employees;
  }

  static getByName(name: string): Employee[] {
    return employees.filter(
      (employee) => employee.getName().toLowerCase() === name.toLowerCase()
    );
  }

  static getById(id: number): Employee | undefined {
    return employees.find((employee) => employee.getId() === id);
  }

  static getByManagerId(id: number): Employee[] {
    return employees.filter((employee) => employee.getManagerId() === id);
  }

  static hasManager(name: string): boolean {
    const employee = employees.find((e) => e.getName() === name);
    return employee?.getManagerId() ? true : false;
  }

  static hasDirectReports(name: string): boolean {
    const employee = employees.find((e) => e.getName() === name);
    return employee
      ? employees.some((e) => e.getManagerId() === employee.getId())
      : false;
  }

  static getTree(
    name: string,
    examples: string
  ): {
    result: Employee[] | null;
    hierarchy: boolean | null;
    similarName?: any[];
  } {
    let employee = this.getByName(name);
    employees =
      examples === "correct"
        ? correctExample
        : examples === "faulty"
        ? faultyExample
        : anotherFaultyExamples;
    if (employee.length > 0) {
      const { result, hierarchy } = Helpers.buildHierarchy(employees, name);
      return { result, hierarchy };
    }
    const similarName: string[] = Helpers.findSimilarNames(name, employees, 3);
    return { result: null, hierarchy: null, similarName };
  }
}
