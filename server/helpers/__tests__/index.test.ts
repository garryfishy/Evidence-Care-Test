import { Employee } from "../../entity/EmployeeEntity";
import { Helpers } from "..";
import {
  correctExample,
  correctExampleData,
  faultyExample,
  anotherFaultyExamples,
} from "../../json/dummy";

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
describe("Helpers", () => {
  const employees: Employee[] = [
    new Employee(1, "John", null, false),
    new Employee(2, "Jane", 1, false),
    new Employee(3, "Tom", 1, false),
    new Employee(4, "James", 2, false),
  ];

  describe("buildHierarchy", () => {
    it("should correctly build the hierarchy for a valid name", () => {
      const name = "raelynn";
      const { result, hierarchy } = Helpers.buildHierarchy(
        correctExample,
        name
      );
      expect(hierarchy).toBe(true);
      expect(result).toEqual(expectedResult);
    });

    it("should return hierarchy as false when no hierarchy is found", () => {
      const name = "linton";
      employees.push(new Employee(5, "Jones", null, false, []));
      const { hierarchy } = Helpers.buildHierarchy(faultyExample, name);

      expect(hierarchy).toBe(false);
      employees.pop();
    });
  });

  describe("findDuplicates", () => {
    it("should find and return duplicate names in the array", () => {
      const arr: string[] = [];
      anotherFaultyExamples.forEach((e) => {
        arr.push(e.getName());
      });
      const duplicates = Helpers.findDuplicates(arr);
      expect(duplicates).toEqual(["linton"]);
    });

    it("should return an empty array if there are no duplicates", () => {
      let arr: string[] = [];
      correctExample.forEach((e) => {
        arr.push(e.getName());
      });
      const duplicates = Helpers.findDuplicates(arr);
      expect(duplicates).toEqual([]);
    });
  });
});
