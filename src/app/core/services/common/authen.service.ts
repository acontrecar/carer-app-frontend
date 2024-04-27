import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthStatus } from '../../enum';
import { User, LoginResponse, CheckTokenResponse } from '../../interfaces';
import { RegisterResponse } from '../../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  // public prueba: WritableSignal<boolean> = signal(false);

  // constructor() {}

  private readonly baseUrl: string = environment.apiUrl;
  private _currentUser: WritableSignal<User | null> = signal<User | null>(null);
  private _authStatus: WritableSignal<AuthStatus> = signal<AuthStatus>(
    AuthStatus.checking
  );

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  constructor(private http: HttpClient) {
    this.checkAuthStatus().subscribe(() => {
      console.log('check desde cons');
    });
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this.setAuthentication(user, token);
      })
    );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<RegisterResponse> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { username, email, password };

    return this.http.post<RegisterResponse>(url, body);
  }

  public checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;

    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => {
        return this.setAuthentication(user, token);
      }),

      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        this._currentUser.set(null);
        return of(false);
      })
    );
  }

  public setAuthentication(user: User, token?: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    if (token) localStorage.setItem('token', token);

    return true;
  }
}
