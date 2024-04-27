import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthStatus } from '../../enum';
import { User, LoginResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  // public prueba: WritableSignal<boolean> = signal(false);

  // constructor() {}

  private readonly baseUrl: string = environment.apiUrl;
  public currentUser: WritableSignal<User | null> = signal<User | null>(null);
  public authStatus: WritableSignal<AuthStatus> = signal<AuthStatus>(
    AuthStatus.checking
  );
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this.currentUser.set(user);
        this.authStatus.set(AuthStatus.authenticated);
      })
    );
  }
}
