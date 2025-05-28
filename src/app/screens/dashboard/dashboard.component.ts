import {RouterLink, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {User} from '../../models/user.model';
import {TaskList} from '../../models/task-list.model';
import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {AuthService} from '../../auth.service';
import {forkJoin, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    LoaderComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  latestTasks: any[] = [];
  taskLists: TaskList[] = [];
  quickTasksListId: number | null = null;

  usersIsLoading: boolean = true;
  tasksIsLoading: boolean = true;
  isFetchingTasks: boolean = false;

  newTaskTitle: string = '';
  newTaskPoints: number = 0; // Nowe pole dla punktów
  selectedUserId: number | null = null;

  constructor(
    private metaService: Meta,
    private authService: AuthService,
    private router: Router
  ) {}

  get loading(): boolean {
    return this.usersIsLoading || this.tasksIsLoading;
  }

  getUsers() {
    this.authService.getUsers().subscribe({
      next: (users) => {
        console.log('Pobrani użytkownicy:', users);
        this.users = users; // Zakładam, że users zawiera total_points z serwera
        this.usersIsLoading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania użytkowników:', err);
        this.usersIsLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/sign-in']);
        }
      },
    });
  }

  getTaskLists() {
    const token =
      localStorage.getItem('auth_token') ||
      sessionStorage.getItem('auth_token');
    console.log('Token w getTaskLists:', token);
    if (!token) {
      console.error('Brak tokena autoryzacji. Przekierowuję na /sign-in');
      this.router.navigate(['/sign-in']);
      return;
    }
    this.authService.getTaskLists().subscribe({
      next: (taskLists: TaskList[]) => {
        console.log('Pobrane listy zadań:', taskLists);
        if (taskLists && taskLists.length > 0) {
          this.taskLists = taskLists;

          const quickTasksList = taskLists.find(
            (list) => list.name === 'Szybkie zadania'
          );
          if (quickTasksList) {
            this.quickTasksListId = quickTasksList.id;
            console.log(
              'Znaleziono listę "Szybkie zadania" z ID:',
              this.quickTasksListId
            );
            this.getLatestTasksFromAllLists();
          } else {
            console.log('Lista "Szybkie zadania" nie istnieje. Tworzę nową...');
            this.createQuickTasksList();
          }
        } else {
          console.log('Brak list zadań. Tworzę listę "Szybkie zadania"...');
          this.createQuickTasksList();
        }
      },
      error: (err) => {
        console.error('Błąd pobierania list zadań:', err);
        this.tasksIsLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/sign-in']);
        }
      },
    });
  }

  createQuickTasksList() {
    this.authService.addTaskList('Szybkie zadania').subscribe({
      next: (response) => {
        console.log('Utworzono listę "Szybkie zadania":', response);
        this.authService.getTaskLists().subscribe({
          next: (taskLists: TaskList[]) => {
            this.taskLists = taskLists;
            const quickTasksList = taskLists.find(
              (list) => list.name === 'Szybkie zadania'
            );
            if (quickTasksList) {
              this.quickTasksListId = quickTasksList.id;
              console.log(
                'ID nowej listy "Szybkie zadania":',
                this.quickTasksListId
              );
              this.getLatestTasksFromAllLists();
            } else {
              console.error(
                'Błąd: Nie udało się znaleźć nowo utworzonej listy.'
              );
              this.tasksIsLoading = false;
            }
          },
          error: (err) => {
            console.error('Błąd pobierania list po utworzeniu:', err);
            this.tasksIsLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Błąd tworzenia listy "Szybkie zadania":', err);
        this.tasksIsLoading = false;
      },
    });
  }

  getLatestTasksFromAllLists() {
    if (this.isFetchingTasks) {
      console.log('Pobieranie zadań już w toku, pomijam...');
      return;
    }

    this.isFetchingTasks = true;

    const token =
      localStorage.getItem('auth_token') ||
      sessionStorage.getItem('auth_token');
    if (!token) {
      console.error('Brak tokena autoryzacji. Przekierowuję na /sign-in');
      this.router.navigate(['/sign-in']);
      this.isFetchingTasks = false;
      return;
    }

    const taskRequests = this.taskLists.map((list: TaskList) =>
      this.authService.getTasks(list.id).pipe(
        catchError((err) => {
          console.error(`Błąd pobierania zadań dla listy ${list.id}:`, err);
          return of([]);
        }),
        map((tasks: any[]) =>
          tasks.map((task) => ({...task, listName: list.name}))
        )
      )
    );

    forkJoin(taskRequests).subscribe({
      next: (allTasks: any[][]) => {
        const flattenedTasks = allTasks.flat();
        const uniqueTasks = Array.from(
          new Map(flattenedTasks.map((task) => [task.id, task])).values()
        );
        this.latestTasks = uniqueTasks.sort((a, b) => b.id - a.id).slice(0, 5);
        console.log('Najnowsze zadania ze wszystkich list:', this.latestTasks);
        this.tasksIsLoading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania zadań:', err);
        this.tasksIsLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/sign-in']);
        }
      },
      complete: () => {
        console.log('Pobieranie zadań zakończone');
        this.isFetchingTasks = false;
      },
    });
  }

  assignTask() {
    if (!this.newTaskTitle || !this.selectedUserId) {
      alert('Proszę podać tytuł zadania i wybrać użytkownika.');
      return;
    }

    if (!this.quickTasksListId) {
      alert(
        'Błąd: Lista "Szybkie zadania" nie została jeszcze utworzona. Spróbuj ponownie za chwilę.'
      );
      return;
    }

    const task = {
      title: this.newTaskTitle,
      description: '',
      assigned_to: this.selectedUserId,
      list_id: this.quickTasksListId,
      points: this.newTaskPoints || 0, // Dodajemy punkty
    };

    this.authService.addTask(task).subscribe({
      next: () => {
        alert('Zadanie zostało przypisane do listy "Szybkie zadania"!');
        this.newTaskTitle = '';
        this.newTaskPoints = 0; // Resetujemy punkty
        this.selectedUserId = null;
        this.getLatestTasksFromAllLists();
        this.getUsers(); // Odświeżamy użytkowników, aby zaktualizować total_points
      },
      error: (err) => {
        console.error('Błąd przypisania zadania:', err);
        alert('Wystąpił błąd podczas przypisywania zadania.');
      },
    });
  }

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit');
    this.getUsers();
    this.getTaskLists();
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
