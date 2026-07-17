import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  protected accountService = inject(AccountService);
  private toast = inject(ToastService);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        this.creds = {};
        this.router.navigate(['/members']);
        this.toast.success("Logged in successfully");
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toast.error(error.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.creds = {};
    this.router.navigate(['/']);
    console.log('Logged out');
  }
}
