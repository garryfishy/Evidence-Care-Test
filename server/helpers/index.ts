import { Employee } from "../entity/EmployeeEntity";

export class Helpers {
  static buildHierarchy(data: Employee[], name:string): {result: Employee[], hierarchy: boolean} {
    const employeesById: { [id: number]: Employee } = {};
    let names : string[] = []
    


    data.forEach((employee) => {
      names.push(employee.getName())
      if(employee.getName() === name){
        employee.setFoundEmployee(true)
      }
      employeesById[employee.getId()] = employee;
    });

    const dupes = this.findDuplicates(names);

    const addSubordinates = (employee: Employee): Employee => {
      const subordinates = data.filter(
        (e) => e.getManagerId() === employee.getId()
      );
      employee.setDirectReports(subordinates.map(addSubordinates))
      return employee;
    };
    let result = data.filter((e) => e.getManagerId() === null).map(addSubordinates) 
    let hierarchy = true
    result.forEach(el => {
      if(el.getManagerId() === null && el.getDirectReports().length === 0 ){
        hierarchy = false
      }
    })

    result = hierarchy ? result : result.filter(el => el.getManagerId() === null && el.getDirectReports().length === 0)
    
    dupes.forEach(e => {
      result.push(new Employee(data.length + 1, e, 0,false))
    })
    return {result, hierarchy};
  }

  static findDuplicates(arr : any[]) {
    const seen : any = {};
    const duplicates: any[] = [];

    arr.forEach((item : any) => {
      if (seen[item] ) {
        if (!duplicates.includes(item)) {
          duplicates.push(item);
        }
      } else {
        seen[item] = true;
      }
    });
  
    return duplicates;
  }
  
}
