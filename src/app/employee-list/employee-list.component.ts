import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { MatSort } from '@angular/material/sort';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../employee-card/employee.model';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'joiningDate', 'delete'];
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatSort) sort!: MatSort;
  employees: Employee[] = [];
  selectedDepartment: string = '';
  departments: string[] = ['HR', 'Engineering', 'Sales', 'Marketing']; // List of departments

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.getAllEmployeeDetails()
  }

  getAllEmployeeDetails() {
    this.employeeService.getEmployees().subscribe((employees: any[]) => {
      this.employees = employees;
      this.dataSource.data = employees;
      this.dataSource.sort = this.sort;
    });
  }


  get filteredEmployees(): Employee[] {
    return this.employees.filter(employee =>
      !this.selectedDepartment || employee.department === this.selectedDepartment
    );
  }

  openDeleteDialog(employee: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(employee.id);
      }
    });
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== employeeId);
      this.dataSource.data = [...this.employees];
    });
  }
}
