import { Component, OnInit } from '@angular/core';
import { User, Story } from '../../models/users';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  listOfStories: Story[];
  storyObj: Story;
  editStoryObj: Story;

  addStoryForm = new FormGroup({
    StoryTitle: new FormControl('', Validators.required),
    StoryContent: new FormControl('', Validators.required),
  });

  editStoryForm = new FormGroup({
    StoryTitle: new FormControl('', Validators.required),
    StoryContent: new FormControl('', Validators.required),
  });

  constructor(private _userservice: UserService) {
    this.listOfStories = [];
    this.editStoryObj = new Story();
   }

  ngOnInit() {
    this.getAllStories();
  }

  getAllStories(){
    this._userservice.getAllStories().subscribe(
      data=>{
        this.listOfStories = data;
      },
      error=>{
      }
    )
  }

  addStory(){
    debugger;
    this.storyObj = this.addStoryForm.value;
    if(this.addStoryForm.invalid)
      return false;
    this._userservice.addStory(this.storyObj).subscribe(
      data=>{
        this.getAllStories();
      },error=>{}
    );
  }

  deleteStory(id){
    debugger; 
    let choice = confirm('Are you sure you want to delete user');
    if(!choice){
      return false;
    }
    this._userservice.deleteStory(id).subscribe(
      data=>{
        alert('Record deleted Successfully');
        this.getAllStories();
      },
      error=>{
      });
  }

  populateEditStory(id){
    this.editStoryObj = this.listOfStories.find(x=> x.ID == id);
    this.editStoryForm.controls['StoryTitle'].setValue(this.editStoryObj.StoryTitle);
    this.editStoryForm.controls['StoryContent'].setValue(this.editStoryObj.StoryContent);
  }

  editStory(){
    let tempId = this.editStoryObj.ID;
    this.editStoryObj = this.editStoryForm.value;
    this.editStoryObj.ID = tempId;
    if(this.editStoryForm.invalid)
      return false;
    this._userservice.editStory(this.editStoryObj).subscribe(
      data=>{
        alert('Record updated Successfully');
        this.getAllStories();
      },
      error=>{
        alert('Something went wrong');
      }
    )
  }

}
