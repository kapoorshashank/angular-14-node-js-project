import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getMessage().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
