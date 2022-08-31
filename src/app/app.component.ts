import { AuthService } from './pages/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bilva-leaf';

  constructor(private authService:AuthService){

  }
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
