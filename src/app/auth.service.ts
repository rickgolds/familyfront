import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {tap, catchError, switchMap} from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://famiback-production.up.railway.app';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private tokenKey = 'auth_token'; // Klucz do przechowywania tokena

  constructor(private http: HttpClient) {
    this.loadInitialToken();
  }

  // Ładowanie tokena przy inicjalizacji serwisu
  private loadInitialToken(): void {
    const token =
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey);
    if (token) {
      console.log('Ładowanie początkowego tokena:', token);
      this.loadUserFromToken(token);
    } else {
      console.warn('Brak tokena podczas inicjalizacji AuthService');
    }
  }

  // Dekodowanie tokena i ustawianie użytkownika
  private loadUserFromToken(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        console.warn('Token wygasł:', decoded);
        this.clearToken();
        return false;
      }
      this.userSubject.next(decoded);
      console.log('Użytkownik załadowany z tokena:', decoded);
      return true;
    } catch (error) {
      console.error('Błąd dekodowania tokena:', error);
      this.clearToken();
      return false;
    }
  }

  // Zapisywanie tokena
  private saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
      console.log('Token zapisany w localStorage:', token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
      console.log('Token zapisany w sessionStorage:', token);
    }
  }

  // Czyszczenie tokena
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    console.log('Token usunięty z localStorage i sessionStorage');
  }

  // Pobieranie tokena
  private getToken(): string | null {
    const token =
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey);
    if (!token) {
      console.warn('Brak tokena w localStorage lub sessionStorage');
    }
    return token;
  }

  signup(
    name: string,
    lastname: string,
    email: string,
    nickname: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/signup`, {
        name,
        lastname,
        email,
        nickname,
        password,
        confirmPassword,
      })
      .pipe(
        catchError((err) => {
          console.error('Błąd rejestracji:', err);
          return throwError(() => new Error('Rejestracja nie powiodła się'));
        })
      );
  }

  signin(
    identifier: string,
    password: string,
    rememberMe: boolean = false
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, {identifier, password}).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token, rememberMe);
          this.loadUserFromToken(response.token);
        } else {
          console.error('Brak tokena w odpowiedzi z /signin:', response);
          throw new Error('Brak tokena w odpowiedzi');
        }
      }),
      catchError((err) => {
        console.error('Błąd logowania:', err);
        return throwError(() => new Error('Logowanie nie powiodło się'));
      })
    );
  }

  // Nowy endpoint do odświeżania tokena
  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('Brak tokena do odświeżenia');
      return throwError(() => new Error('Brak tokena'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, {headers}).pipe(
      tap((response: any) => {
        if (response.token) {
          const rememberMe = !!localStorage.getItem(this.tokenKey);
          this.saveToken(response.token, rememberMe);
          this.loadUserFromToken(response.token);
          console.log('Token odświeżony:', response.token);
        }
      }),
      catchError((err) => {
        console.error('Błąd odświeżania tokena:', err);
        this.clearToken();
        return throwError(
          () => new Error('Odświeżanie tokena nie powiodło się')
        );
      })
    );
  }

  logout(): void {
    this.clearToken();
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }

  // Uogólniona metoda do tworzenia nagłówków z tokenem
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      console.error('Brak tokena dla żądania');
      throw new Error('Brak tokena autoryzacji');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/users`, {headers: this.getAuthHeaders()})
      .pipe(
        catchError((err) => {
          console.error('Błąd pobierania użytkowników:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              tap(() =>
                console.log('Ponawianie żądania getUsers po odświeżeniu tokena')
              ),
              switchMap(() =>
                this.http.get(`${this.apiUrl}/users`, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  getTaskLists(): Observable<any> {
    console.log('Wysyłanie żądania getTaskLists');
    return this.http
      .get(`${this.apiUrl}/task-lists`, {headers: this.getAuthHeaders()})
      .pipe(
        catchError((err) => {
          console.error('Błąd pobierania list zadań:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              tap(() =>
                console.log(
                  'Ponawianie żądania getTaskLists po odświeżeniu tokena'
                )
              ),
              switchMap(() =>
                this.http.get(`${this.apiUrl}/task-lists`, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  addTaskList(name: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/task-lists`,
        {name},
        {headers: this.getAuthHeaders()}
      )
      .pipe(
        catchError((err) => {
          console.error('Błąd dodawania listy zadań:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.post(
                  `${this.apiUrl}/task-lists`,
                  {name},
                  {headers: this.getAuthHeaders()}
                )
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  updateTaskList(listId: number, name: string): Observable<any> {
    return this.http
      .put(
        `${this.apiUrl}/task-lists/${listId}`,
        {name},
        {headers: this.getAuthHeaders()}
      )
      .pipe(
        catchError((err) => {
          console.error('Błąd aktualizacji listy zadań:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.put(
                  `${this.apiUrl}/task-lists/${listId}`,
                  {name},
                  {headers: this.getAuthHeaders()}
                )
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  deleteTaskList(listId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/task-lists/${listId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('Błąd usuwania listy zadań:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.delete(`${this.apiUrl}/task-lists/${listId}`, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  getTasks(listId: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/tasks/${listId}`, {headers: this.getAuthHeaders()})
      .pipe(
        catchError((err) => {
          console.error('Błąd pobierania zadań:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.get(`${this.apiUrl}/tasks/${listId}`, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  addTask(task: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/tasks`, task, {headers: this.getAuthHeaders()})
      .pipe(
        catchError((err) => {
          console.error('Błąd dodawania zadania:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.post(`${this.apiUrl}/tasks`, task, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  updateTask(taskId: number, task: any): Observable<any> {
    const updatedTask = {...task};

    if (updatedTask.due_date) {
      const date = new Date(updatedTask.due_date);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        updatedTask.due_date = `${year}-${month}-${day}`;
      } else {
        console.error('Nieprawidłowa data due_date:', updatedTask.due_date);
        updatedTask.due_date = null;
      }
    } else {
      updatedTask.due_date = null;
    }

    if (
      updatedTask.due_date &&
      !/^\d{4}-\d{2}-\d{2}$/.test(updatedTask.due_date)
    ) {
      console.error(
        'Nieprawidłowy format due_date po sformatowaniu:',
        updatedTask.due_date
      );
      updatedTask.due_date = null;
    }

    return this.http
      .put(`${this.apiUrl}/tasks/${taskId}`, updatedTask, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('Błąd aktualizacji zadania:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.put(`${this.apiUrl}/tasks/${taskId}`, updatedTask, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/tasks/${taskId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('Błąd usuwania zadania:', err);
          if (err.status === 401 || err.status === 403) {
            return this.refreshToken().pipe(
              switchMap(() =>
                this.http.delete(`${this.apiUrl}/tasks/${taskId}`, {
                  headers: this.getAuthHeaders(),
                })
              )
            );
          }
          return throwError(() => err);
        })
      );
  }
}
