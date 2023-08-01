import { Employee } from "../../entity/EmployeeEntity";
import { EmployeeService } from "../EmployeeService";
import { correctExample } from "../../json/dummy";

describe("EmployeeService", () => {
  const employees = correctExample;

  describe("getAll", () => {
    it("should return all employees", () => {
      const allEmployees = EmployeeService.getAll("correct");
      expect(allEmployees).toEqual(employees);
    });
  });

  describe("getByName", () => {
    it("should return an array of employees with the given name", () => {
      const name = "hayleigh";
      const hayleighEmployees = EmployeeService.getByName(name);
      const expectedEmployees = employees.filter(
        (e) => e.getName().toLowerCase() === name.toLowerCase()
      );
      expect(hayleighEmployees).toEqual(expectedEmployees);
    });
  });

  describe("getById", () => {
    it("should return the employee with the given ID", () => {
      const id = 3;
      const employee = EmployeeService.getById(id);
      const expectedEmployee = employees.find((e) => e.getId() === id);
      expect(employee).toEqual(expectedEmployee);
    });

    it("should return undefined for non-existing ID", () => {
      const id = 100;
      const employee = EmployeeService.getById(id);
      expect(employee).toBeUndefined();
    });
  });

  describe("getByManagerId", () => {
    it("should return an array of employees with the given manager ID", () => {
      const managerId = 1;
      const managerEmployees = EmployeeService.getByManagerId(managerId);
      const expectedEmployees = employees.filter(
        (e) => e.getManagerId() === managerId
      );
      expect(managerEmployees).toEqual(expectedEmployees);
    });

    it("should return an empty array for non-existing manager ID", () => {
      const managerId = 100;
      const managerEmployees = EmployeeService.getByManagerId(managerId);
      expect(managerEmployees).toEqual([]);
    });
  });

  describe("hasManager", () => {
    it("should return true for employees with a manager", () => {
      const name = "evelina";
      const hasManager = EmployeeService.hasManager(name);
      expect(hasManager).toBe(true);
    });

    it("should return false for employees without a manager", () => {
      const name = "raelynn";
      const hasManager = EmployeeService.hasManager(name);
      expect(hasManager).toBe(false);
    });
  });

  describe("hasDirectReports", () => {
    it("should return true for employees with direct reports", () => {
      const name = "raelynn";
      const hasDirectReports = EmployeeService.hasDirectReports(name);
      expect(hasDirectReports).toBe(true);
    });

    it("should return false for employees without direct reports", () => {
      const name = "evelina";
      const hasDirectReports = EmployeeService.hasDirectReports(name);
      expect(hasDirectReports).toBe(false);
    });
  });
});
