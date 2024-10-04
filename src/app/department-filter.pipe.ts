import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee-card/employee.model';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'departmentFilter'
})
export class DepartmentFilterPipe implements PipeTransform {

  transform(dataSource: MatTableDataSource<Employee>, selectedDepartment: string): MatTableDataSource<Employee> {
    if (!dataSource || !selectedDepartment) {
      return dataSource;
    }

    const filteredData = dataSource.data.filter(employee => 
      employee.department === selectedDepartment
    );

    return new MatTableDataSource(filteredData);
  }

}
