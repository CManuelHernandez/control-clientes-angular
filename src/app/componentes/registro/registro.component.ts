import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LooginService } from 'src/app/servicios/login.service';
import { error } from 'protractor';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginsService: LooginService) { }

    ngOnInit(): void {
      this.loginsService.getAuth().subscribe(auth => {
        if (auth){
          this.router.navigate(['/']);
        }
      });
    }

    registro(){
      this.loginsService.registrarse(this.email, this.password)
      .then( res => {
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.flashMessages.show( error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
    }
}
