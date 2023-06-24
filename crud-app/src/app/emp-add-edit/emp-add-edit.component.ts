import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.less'],
})
export class EmpAddEditComponent implements OnInit {
  educList: string[] = ['Bachelor', 'Graduate', 'High School'];

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _core: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = _fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (res) => {
              this._dialogRef.close(true);
              this._core.openSnackBar('Employee Updated');
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (res) => {
            this._dialogRef.close(true);
            this._core.openSnackBar('New Employee Added');
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
