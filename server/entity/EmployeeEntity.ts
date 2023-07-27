export class Employee {
  private id: number;
  private name: string;
  private managerId: number | null;
  private foundEmployee: boolean;
  private directReports: Employee[];

  constructor(id: number, name: string, managerId: number | null, foundEmployee: boolean) {
    this.id = id;
    this.name = name;
    this.managerId = managerId !== null ? managerId : null;
    this.foundEmployee = foundEmployee;
    this.directReports = [];
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getManagerId(): number | null {
    return this.managerId;
  }

  getFoundEmployee(): boolean{
    return this.foundEmployee;
  }

  getDirectReports(): Employee[]{
    return this.directReports;
  }

  setId(id: number): Employee {
    this.id = id;
    return this;
  }

  setName(name: string): Employee{
    this.name = name;
    return this;
  }

  setManagerId(managerId: number): Employee {
    this.managerId = managerId;
    return this;
  }

  setFoundEmployee(found: boolean): Employee {
    this.foundEmployee = found;
    return this;
  }

  setDirectReports(directReports: Employee[]): Employee{
    this.directReports = directReports;
    return this;
  }
}
