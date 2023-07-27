export class Employee {
  private id: number;
  private name: string;
  private managerId: number | null;
  directReports: Employee[];

  constructor(id: number, name: string, managerId: number | null) {
    this.id = id;
    this.name = name;
    this.managerId = managerId !== null ? managerId : null;
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
}
