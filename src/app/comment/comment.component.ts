import { FromNowPipe } from './../pipes/from-now.pipe';
import { NotificationsService } from './../services/notifications.service';
import { AuthService } from './../services/auth.service';
import { ProjectService } from 'app/services/project.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { NgForm, FormControl, NgModel } from '@angular/forms';
import { ValidationManager } from 'ng2-validation-manager';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [ FromNowPipe ]
})
export class CommentComponent implements OnInit {
  //@Input('project') project: Project;
  @Input('projectId') projectId: string;
  @Input('projectTitle') projectTitle: string;
  //projectId;
  //projectTitle;
  username;
  userId;
  pix;
  currentUser;
  allComments;
  comment : any = {};
  form;
  errorMessage;
 
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthService,
    private commentService: CommentService,
    private fromNow: FromNowPipe,
    private notificationsService: NotificationsService) { 
      this.currentUser = this.authService.currentUser;
      //this.projectId = '5a295d8c5daba53b7061c23b';
      //this.projectTitle = 'testing';
    }
 
  ngOnInit() {
    this.commentService.getAProjectComment(this.projectId)
      .subscribe(allComments => {
        this.allComments = allComments;
        //console.log(this.allComments);
      },
      errorMessage => { 
        this.errorMessage = <any>errorMessage;
      });
      this.form = new ValidationManager({
        'message' : 'required'
      });
  
      this.form.setValue({
      });
  
      this.form.setErrorMessage('message', 'required', 'Message cannot be empty');
  }

  makeComment() {
    if(this.form.isValid()){
      //this.removeFormGroup();
      this.comment = this.form.getData();
      this.comment['userId'] = this.currentUser._id;
      this.comment['username'] = this.currentUser.username;
      this.comment['userpix'] = this.currentUser.picture;
      this.comment['projectId'] = this.projectId;
      this.comment['projectTitle'] = this.projectTitle;

      //console.log(this.comment);

      //uptimistic update
      let indexPosition = this.allComments.length;
      this.allComments.splice(indexPosition, 0, this.comment);

      this.commentService.create(this.comment)
        .subscribe(data => {
          //this.allComments = data;

          this.notificationsService.notify("success", 'Submitted', 
            'Your comment has been succesfully submitted');
        },
        errorMessage => { 
          //reverse uptimistic update
          this.allComments.splice(indexPosition, 1);

          this.notificationsService.notify("error", 'Submission Failed', 'Comment fail, try again later!');
          this.errorMessage = <any>errorMessage
        });
    }
    this.form.reset();
  }

  showTime(value) {
    //return this.fromNow.transform(value);
    return moment(value).fromNow();
  }

}
