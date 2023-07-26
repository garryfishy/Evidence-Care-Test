import { Employee } from '../entity/EmployeeEntity';

let example = [
    {
      "id": 1,
      "name": "raelynn",
      "managerId": null
    },
    {
      "id": 2,
      "name": "darin",
      "managerId": 1
    },
    {
      "id": 3,
      "name": "kacie",
      "managerId": 1
    },
    {
      "id": 4,
      "name": "jordana",
      "managerId": 2
    },
    {
      "id": 5,
      "name": "everett",
      "managerId": 2
    },
    {
      "id": 6,
      "name": "bertha",
      "managerId": 2
    },
    {
      "id": 7,
      "name": "peg",
      "managerId": 3
    },
    {
      "id": 8,
      "name": "hugh",
      "managerId": 3
    },
    {
      "id": 9,
      "name": "eveleen",
      "managerId": 3
    },
    {
      "id": 10,
      "name": "evelina",
      "managerId": 9
    }
  ]
  
  

  const employees: Employee[] = example.map((item) => new Employee(item.id, item.name, item.managerId));


export class EmployeeService {
  static getAll(): Employee[] {
    return employees;
  }

  static getByName(name: string): Employee | undefined{
    return employees.find((employee) => employee.getName() === name);
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
    return employee ? employees.some((e) => e.getManagerId() === employee.getId()) : false;
  }

  static getTree(name: string, hasManager: boolean) : any {
    let result: any = []
    let employee = this.getByName(name)
    let stillHasManager = hasManager;
    if(hasManager){
      while(stillHasManager){
        result.push(employee)
        if(employee?.getManagerId() !== null){
          let id = Number(employee?.getManagerId())
          let manager = this.getById(id)
          employee = manager
        }else{
          stillHasManager = false;
        }
      }
    }
    return result;
  }
}
