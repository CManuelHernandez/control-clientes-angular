import { Component, OnInit } from '@angular/core';
import { LooginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLogedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginService: LooginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLogedIn = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion =>{
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }

  logout(){
    this.loginService.logout();
    this.isLogedIn = false;
    this.router.navigate(['/login']);
  }

}
