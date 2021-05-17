import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: any;
  userId: string;


  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
      })
    }

  }

}
