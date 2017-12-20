import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { NotificationsService } from 'app/services/notifications.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange
    .subscribe(notification => {
      //this.msgs.length = 0;
      this.msgs = [];
      this.msgs.push(notification);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
