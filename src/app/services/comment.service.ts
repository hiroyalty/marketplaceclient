import { Comment } from './../models/comment';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CommentService extends DataService {

  constructor(http: Http) {
    super(http);
  }

  getAProjectComment(projectId) {
    return super.getOne(this.baseUrl + '/comments/getAProjectComment', projectId );
  }

  create(comment: Comment) {
    return super.create(this.baseUrl + '/comments/create', comment);
  }
}
