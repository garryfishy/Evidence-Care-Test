import { Employee } from "../entity/EmployeeEntity";

export class Helpers {
  static buildHierarchy(data: Employee[]): Employee[] {
    const employeesById: { [id: number]: Employee } = {};
    data.forEach((employee) => {
      employeesById[employee.getId()] = employee;
    });
    const addSubordinates = (employee: Employee): Employee => {
      const subordinates = data.filter(
        (e) => e.getManagerId() === employee.getId()
      );
      employee["directReports"] = subordinates.map(addSubordinates);
      return employee;
    };
    return data.filter((e) => e.getManagerId() === null).map(addSubordinates);
  }
}
