import { Employee } from "../entity/EmployeeEntity";
import { Helpers } from "../helpers";
let example = [
  {
    id: 1,
    name: "raelynn",
    managerId: null,
  },
  {
    id: 2,
    name: "darin",
    managerId: 1,
  },
  {
    id: 3,
    name: "kacie",
    managerId: 1,
  },
  {
    id: 4,
    name: "jordana",
    managerId: 2,
  },
  {
    id: 5,
    name: "everett",
    managerId: 2,
  },
  {
    id: 6,
    name: "bertha",
    managerId: 2,
  },
  {
    id: 7,
    name: "peg",
    managerId: 3,
  },
  {
    id: 8,
    name: "hugh",
    managerId: 3,
  },
  {
    id: 9,
    name: "eveleen",
    managerId: 3,
  },
  {
    id: 10,
    name: "evelina",
    managerId: 9,
  },
  {
    id: 11,
    name: "darin",
    managerId: 5,
  },
  {
    id: 12,
    name: "darina",
    managerId: 10,
  },
];

// let example = [
//   {
//     id: 1,
//     name: "maurice",
//     managerId: null,
//   },
//   {
//     id: 2,
//     name: "hayleigh",
//     managerId: 1,
//   },
//   {
//     id: 3,
//     name: "edwyn",
//     managerId: 1,
//   },
//   {
//     id: 4,
//     name: "keane",
//     managerId: null,
//   },
//   {
//     id: 5,
//     name: "kylee",
//     managerId: null,
//   },
// ];

const employees: Employee[] = example.map(
  (item) => new Employee(item.id, item.name, item.managerId)
);

export class EmployeeService {
  static getAll(): Employee[] {
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
    return employee ? employee.getManagerId() !== null : false;
  }

  static hasDirectReports(name: string): boolean {
    const employee = employees.find((e) => e.getName() === name);
    return employee
      ? employees.some((e) => e.getManagerId() === employee.getId())
      : false;
  }

  static getTree(name: string): any {
    let result: any = [];
    let employee = this.getByName(name);
    if (employee.length > 0) {
      if (employee.length === 1) {
        let hasManager = EmployeeService.hasManager(name);
        const hasDirectReports = EmployeeService.hasDirectReports(name);
        if (!hasDirectReports && !hasManager) {
          return result;
        }
        // == THIS CODE CAN BE USED IF YOU WANT TO GET ONLY HIERARCY FROM THE PERSON===
        // if (hasManager) {
        //   // let newEmployee: Employee | undefined = employee[0];
        //   // result.push(newEmployee);
        //   // while (hasManager) {
        //   //   let id = Number(newEmployee!.getManagerId());
        //   //   let manager = this.getById(id);
        //   //   result.push(manager);
        //   //   newEmployee = manager;
        //   //   if (newEmployee!.getManagerId() === null) {
        //   //     hasManager = false;
        //   //   }
        //   // }
        //   result = this.buildHierarchy(employees);
        // } else {
        //   result.push(employee);
        //   result = this.buildHierarchy(employees);
        // }
        result = Helpers.buildHierarchy(employees);
      }
      return result;
    } else {
      return null;
    }
  }
}
