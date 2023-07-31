import { Employee } from "../entity/EmployeeEntity";

export class Helpers {
  static buildHierarchy(
    data: Employee[],
    name: string
  ): { result: Employee[]; hierarchy: boolean } {
    const employeesById: { [id: number]: Employee } = {};
    let names: string[] = [];
    data.forEach((employee) => {
      names.push(employee.getName());
      if (employee.getName().toLowerCase() === name.toLowerCase()) {
        employee.setFoundEmployee(true);
      } else {
        employee.setFoundEmployee(false);
      }
      employeesById[employee.getId()] = employee;
    });
    const dupes: any[] = this.findDuplicates(names);
    const addSubordinates = (employee: Employee): Employee => {
      const subordinates = data.filter(
        (e) => e.getManagerId() === employee.getId()
      );
      employee.setDirectReports(subordinates.map(addSubordinates));
      return employee;
    };
    let result = data
      .filter((e) => e.getManagerId() === null)
      .map(addSubordinates);
    let hierarchy = true;
    result.forEach((el) => {
      if (el.getManagerId() === null && el.getDirectReports().length === 0) {
        hierarchy = false;
      }
    });

    result = hierarchy
      ? result
      : result.filter(
          (el) =>
            el.getManagerId() === null && el.getDirectReports().length === 0
        );
    return { result, hierarchy };
  }

  static findDuplicates(arr: any[]) {
    const seen: any = {};
    const duplicates: any[] = [];

    arr.forEach((item: any) => {
      if (seen[item]) {
        if (!duplicates.includes(item)) {
          duplicates.push(item);
        }
      } else {
        seen[item] = true;
      }
    });

    return duplicates;
  }

  static levenshteinDistance(str1: string, str2: string) {
    const track = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }
    return track[str2.length][str1.length];
  }

  static findSimilarNames(input: string, data: any[], threshold: number) {
    const similarNames = [];
    for (const item of data) {
      const distance = this.levenshteinDistance(
        input.toLowerCase(),
        item.name.toLowerCase()
      );
      if (distance <= threshold) {
        similarNames.push(item.name);
      }
    }
    return similarNames;
  }

  static containsNumberOrSpecialCharacters(input: string) {
    const pattern = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return pattern.test(input);
  }
}
