import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUser().subscribe((data) => {
      this.userList = data;
    })
  }

  viewUser(user: any) {
    this.router.navigate(['/detail', { id: user._id }]);
  }
  editUser(user) {
    this.router.navigateByUrl('/adduser', { state: { user: user } });
  }

  deleteUser(user) {
    let delId = user._id;
    this.userService.deleteUser(delId).subscribe((data) => {
      if (data) {
        this.getUsers();
      }
    })
  }
}
