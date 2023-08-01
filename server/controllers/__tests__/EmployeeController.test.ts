import { Request, Response } from "express";
import { Employee } from "../../entity/EmployeeEntity";
import { EmployeeController } from "../EmployeeController";
import { ResponseEntity } from "../../entity/ResponseEntity";
import { EmployeeService } from "../../services/EmployeeService";
import { Helpers } from "../../helpers";
import { correctExample } from "../../json/dummy";

jest.mock("../../services/EmployeeService");

const evelina = new Employee(10, "evelina", 9, false, []);
const eveleen = new Employee(9, "eveleen", 3, false, [evelina]);
const jordana = new Employee(4, "jordana", 2, false, []);
const everett = new Employee(5, "everett", 2, false, []);
const bertha = new Employee(6, "bertha", 2, false, []);
const darin = new Employee(2, "darin", 1, false, [jordana, everett, bertha]);
const peg = new Employee(7, "peg", 3, false, []);
const hugh = new Employee(8, "hugh", 3, false, []);
const kacie = new Employee(3, "kacie", 1, false, [peg, hugh, eveleen]);
const raelynn = new Employee(1, "raelynn", null, true, [darin, kacie]);

const expectedResult = [raelynn];

describe("EmployeeController", () => {
  describe("getAllEmployees", () => {
    it("should return all employees", () => {
      const example = "correct";
      const mockRequest: Request = { params: { example } } as any;
      const mockResponse: Response = { json: jest.fn() } as any;
      EmployeeService.getAll = jest.fn().mockReturnValue(correctExample);

      EmployeeController.getAllEmployees(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(correctExample);
    });
  });

  describe("getTreeByName", () => {
    it("should return the hierarchy for a valid name", () => {
      const name = "raelynn";
      const mockRequest: Request = { params: { name } } as any;
      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      EmployeeService.getTree = jest.fn().mockReturnValue({
        result: expectedResult,
        hierarchy: true,
      });

      EmployeeController.getTreeByName(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ResponseEntity<Employee>(true, "Fetched", expectedResult)
      );
    });

    it("should return a similar name suggestion for an invalid name", () => {
      const name = "jon";
      const mockRequest: Request = { params: { name } } as any;
      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      EmployeeService.getTree = jest.fn().mockReturnValue({
        result: null,
        hierarchy: null,
        similarName: ["raelynn", "kacie"],
      });

      EmployeeController.getTreeByName(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ResponseEntity<null>(
          false,
          "User jon not found, maybe you mean raelynn,kacie?",
          []
        )
      );
    });

    it("should return an error for a name containing special characters", () => {
      const name = "john$";
      const mockRequest: Request = { params: { name } } as any;
      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      Helpers.containsNumberOrSpecialCharacters = jest
        .fn()
        .mockReturnValue(true);

      EmployeeController.getTreeByName(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ResponseEntity<null>(
          false,
          "Input cannot contain numbers or special characters",
          []
        )
      );
    });
  });
});
