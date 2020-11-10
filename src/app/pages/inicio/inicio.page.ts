import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  OnSubmitLogin() {
    this.authService.login(this.email, this.password).then(res => {
    this.router.navigate(['/gestion']);
    }).catch(err => alert('Los datos son incorrectos o no existen'));
  }

}
