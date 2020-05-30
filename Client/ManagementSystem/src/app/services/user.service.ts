import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { User, Story } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getAllUsers(){
    return this._http.get<User[]>('http://localhost:52114/api/Users/GetUsers');
  }

  addUser(obj: User){
    return this._http.post('http://localhost:52114/api/Users/PostUser', obj);
  }

  deleteUser(id){
    return this._http.delete('http://localhost:52114/api/Users/DeleteUser/' + id);
  }

  editUser(obj: User){
    return this._http.put('http://localhost:52114/api/Users/PutUser/'+obj.ID, obj);
  }

  getAllStories(){
    return this._http.get<Story[]>('http://localhost:52114/api/Story/GetTbl_Story');
  }

  addStory(obj: Story){
    return this._http.post('http://localhost:52114/api/Story/PostTbl_Story', obj);
  }

  deleteStory(id){
    return this._http.delete('http://localhost:52114/api/Story/DeleteTbl_Story/' + id);
  }

  editStory(obj: Story){
    return this._http.put('http://localhost:52114/api/Story/PutTbl_Story/'+obj.ID, obj);
  }
}
