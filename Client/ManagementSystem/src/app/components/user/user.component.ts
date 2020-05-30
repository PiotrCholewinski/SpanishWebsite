import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[];
  userObj: User;
  editUserObj: User;

  editUserForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Age: new FormControl(''),
    Gender: new FormControl(''),
  });

  constructor(private _userservice: UserService) {

    this.userList = [];
    this.userObj = new User;
    this.editUserObj = new User;
   }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this._userservice.getAllUsers().subscribe(
      data=>{
        this.userList = data;
      },
      error=>{
      }
    )
  }

  addUser(){
    debugger;
    this._userservice.addUser(this.userObj).subscribe(
      data=>{
        this.getAllUsers();
      },
      error=>{
      }
    )
  }

  deleteUser(id){
    debugger; 
    let choice = confirm('Are you sure you want to delete user');
    if(!choice){
      return false;
    }
    this._userservice.deleteUser(id).subscribe(
      data=>{
        alert('Record deleted Successfully');
        this.getAllUsers();
      },
      error=>{
      });
  }

  editUserModal(id){
    this.editUserObj = this.userList.find(x=> x.ID == id);
    this.editUserForm.controls['Name'].setValue(this.editUserObj.Name);
    this.editUserForm.controls['Age'].setValue(this.editUserObj.Age);
    this.editUserForm.controls['Email'].setValue(this.editUserObj.Email);
    this.editUserForm.controls['Gender'].setValue(this.editUserObj.Gender);
    this.editUserForm.controls['Password'].setValue(this.editUserObj.Password);
  }

  editUser(){
    let tempId = this.editUserObj.ID;
    this.editUserObj = this.editUserForm.value;
    this.editUserObj.ID = tempId;
    this._userservice.editUser(this.editUserObj).subscribe(
      data=>{
        alert('Record updated Successfully');
        this.getAllUsers();

      },
      error=>{
        alert('Something went wrong');
      }
    )
  }

}
