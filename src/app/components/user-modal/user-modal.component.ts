import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;
  userData: any;
  imagePreview: any;
  isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAPI: UserService, private router: Router,
    private route: ActivatedRoute) {
    let data = this.router.getCurrentNavigation().extras.state;
    if (data) {
      this.userData = data.user;
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      image: ['', Validators.required]
    })

    if (this.userData) {
      this.userForm.setValue({
        firstname: this.userData.firstname, lastname: this.userData.lastname,
        email: this.userData.email, phonenumber: this.userData.phonenumber,
        image: this.userData.imageUrl
      });
      this.imagePreview = this.userData.imageUrl;
      this.isEdit = true;
    }
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.get('image').patchValue(file);
    this.userForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.userForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  addUpdateUser() {
    if (this.isEdit) {
      this.userAPI.updateUser(this.userData._id, this.userForm.value, this.userForm.get('image').value).subscribe((resp) => {
        if (resp) {
          this.router.navigateByUrl('/list');
        }
      }, (error) => {
        console.error(error);
      })
    } else {
      this.userAPI.createUser(this.userForm.value, this.userForm.get('image').value).subscribe((resp) => {
        if (resp) {
          this.router.navigateByUrl('/list');
        }
      }, (error) => {
        console.error(error);
      })
    }
  }


}
