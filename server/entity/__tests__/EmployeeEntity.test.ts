import { Employee } from "../EmployeeEntity";

describe("Employee Class", () => {
  it("should correctly initialize properties", () => {
    const employee = new Employee(1, "John", null, true);
    expect(employee.getId()).toBe(1);
    expect(employee.getName()).toBe("John");
    expect(employee.getManagerId()).toBeNull();
    expect(employee.getFoundEmployee()).toBe(true);
    expect(employee.getDirectReports()).toEqual([]);
  });

  it("should correctly set properties using setters", () => {
    const employee = new Employee(1, "John", null, true);

    employee.setId(2);
    employee.setName("Jane");
    employee.setManagerId(1);
    employee.setFoundEmployee(false);
    employee.setDirectReports([]);

    expect(employee.getId()).toBe(2);
    expect(employee.getName()).toBe("Jane");
    expect(employee.getManagerId()).toBe(1);
    expect(employee.getFoundEmployee()).toBe(false);
    expect(employee.getDirectReports()).toEqual([]);
  });

  it("should correctly add direct reports", () => {
    const john = new Employee(1, "John", null, true);
    const jane = new Employee(2, "Jane", 1, false);
    const employees = [jane];

    john.setDirectReports([jane]);
    expect(john.getDirectReports()).toEqual(employees);
  });
});
