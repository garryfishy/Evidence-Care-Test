import { Request, Response } from 'express';
import { Employee } from '../entity/EmployeeEntity'
import { EmployeeService } from '../services/EmployeeService';
  export class EmployeeController {
  
    static getAllEmployees(req: Request, res: Response): void {
        const result = EmployeeService.getAll()
        res.json(result)
    }

    static getTreeByName(req: Request, res: Response): void {
        let result: any = []
        const {name} = req.params
        const getByName = EmployeeService.getByName(name)
        if(getByName){
            const hasManager = EmployeeService.hasManager(name)
            const hasDirectReports = EmployeeService.hasDirectReports(name)
            if(hasDirectReports || hasManager){
                result = EmployeeService.getTree(name, hasManager)
            }
        }else{
            res.send("not found")
        }
      res.json(result)

      }
  }
  
