import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';

import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {AuthService} from '../../auth.service';
import {Task} from '../../models/task.model';
import {TaskList} from '../../models/task-list.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-deposits',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './deposits.component.html',
  styleUrl: './deposits.component.scss',
})
export class DepositsComponent implements OnInit, OnDestroy {
  taskLists: TaskList[] = [];
  tasks: Task[] = [];
  users: User[] = [];
  selectedList: TaskList | null = null;
  newTask: Partial<Task> = {
    title: '',
    description: '',
    assigned_to: undefined,
    list_id: undefined,
    due_date: undefined,
  };
  newListName: string | null = null;
  editList: TaskList | null = null;
  editTask: Task | null = null;
  private taskSubscription: Subscription | undefined;
  private listSubscription: Subscription | undefined;
  private pollingInterval: any;
  today: string = new Date().toISOString().split('T')[0];

  // Domyślne dzienne zadania
  defaultTasks: {title: string; description: string}[] = [
    {
      title: 'Posprzątaj salon',
      description: 'Uporządkuj salon przed rodzinnym spotkaniem.',
    },
    {
      title: 'Zrób zakupy spożywcze',
      description: 'Kup produkty na rodzinne wydarzenie.',
    },
    {
      title: 'Przygotuj śniadanie',
      description: 'Przygotuj śniadanie dla rodziny.',
    },
    {title: 'Wynieś śmieci', description: 'Wynieś śmieci z kuchni i łazienki.'},
    {
      title: 'Udekoruj stół',
      description: 'Przygotuj stół na rodzinne spotkanie.',
    },
  ];

  // Stan rozwinięcia sekcji "Dzienne zadania"
  showDefaultTasks: boolean = false;
  // Wybrane domyślne zadanie do przypisania
  selectedDefaultTask: {title: string; description: string} | null = null;
  // Wybrany użytkownik do przypisania zadania
  selectedUserForDefaultTask: number | null = null;

  constructor(private metaService: Meta, private authService: AuthService) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
    this.loadTaskLists();
    this.loadUsers();
    this.startPollingTasks();
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
    this.stopPollingTasks();
  }

  startPollingTasks(): void {
    this.pollingInterval = setInterval(() => {
      if (this.selectedList) {
        this.loadTasks(this.selectedList.id);
      }
    }, 10000);
  }

  stopPollingTasks(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  loadTaskLists(): void {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }

    this.listSubscription = this.authService.getTaskLists().subscribe({
      next: (lists: TaskList[]) => {
        this.taskLists = lists;
        if (lists.length > 0 && !this.selectedList) {
          this.selectList(lists[0]);
        }
      },
      error: (err) => {
        console.error('Błąd podczas pobierania list:', err);
      },
    });
  }

  loadTasks(listId: number): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }

    this.taskSubscription = this.authService.getTasks(listId).subscribe({
      next: (tasks: Task[]) => {
        const uniqueTasks = Array.from(
          new Map(tasks.map((task) => [task.id, task])).values()
        );
        // Aktualizacja tasks tylko po otrzymaniu danych
        this.tasks = uniqueTasks;
      },
      error: (err) => {
        console.error('Błąd podczas pobierania zadań:', err);
      },
    });
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Błąd podczas pobierania użytkowników:', err);
      },
    });
  }

  selectList(list: TaskList): void {
    this.selectedList = list;
    this.newTask.list_id = list.id;
    this.loadTasks(list.id);
  }

  addTaskList(): void {
    if (!this.newListName) {
      alert('Nazwa listy jest wymagana!');
      return;
    }

    this.authService.addTaskList(this.newListName).subscribe({
      next: () => {
        this.loadTaskLists();
        this.newListName = null;
      },
      error: (err) => {
        console.error('Błąd podczas dodawania listy:', err);
      },
    });
  }

  startEditList(list: TaskList): void {
    this.editList = {...list};
  }

  updateList(): void {
    if (!this.editList?.name) {
      alert('Nazwa listy jest wymagana!');
      return;
    }

    this.authService
      .updateTaskList(this.editList.id, this.editList.name)
      .subscribe({
        next: () => {
          this.loadTaskLists();
          this.editList = null;
        },
        error: (err) => {
          console.error('Błąd podczas edycji listy:', err);
        },
      });
  }

  deleteList(listId: number): void {
    if (
      confirm('Czy na pewno chcesz usunąć tę listę i wszystkie jej zadania?')
    ) {
      this.authService.deleteTaskList(listId).subscribe({
        next: () => {
          this.loadTaskLists();
          this.selectedList = null;
          this.tasks = [];
        },
        error: (err) => {
          console.error('Błąd podczas usuwania listy:', err);
        },
      });
    }
  }

  addTask(): void {
    if (
      !this.newTask.title ||
      this.newTask.assigned_to === undefined ||
      this.newTask.list_id === undefined
    ) {
      alert('Tytuł, przypisany użytkownik i lista są wymagane!');
      return;
    }

    this.authService.addTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks(this.newTask.list_id!);
        this.newTask = {
          title: '',
          description: '',
          assigned_to: undefined,
          list_id: this.newTask.list_id,
          due_date: undefined,
        };
      },
      error: (err) => {
        console.error('Błąd podczas dodawania zadania:', err);
      },
    });
  }

  startEdit(task: Task): void {
    this.editTask = {...task};
  }

  updateTask(): void {
    if (!this.editTask?.title || !this.editTask?.assigned_to) {
      alert('Tytuł i przypisany użytkownik są wymagane!');
      return;
    }

    this.authService.updateTask(this.editTask.id, this.editTask).subscribe({
      next: () => {
        this.loadTasks(this.selectedList!.id);
        this.editTask = null;
      },
      error: (err) => {
        console.error('Błąd podczas aktualizacji zadania:', err);
      },
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
      this.authService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks(this.selectedList!.id);
        },
        error: (err) => {
          console.error('Błąd podczas usuwania zadania:', err);
        },
      });
    }
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    this.authService.updateTask(task.id, task).subscribe({
      next: () => {
        this.loadTasks(this.selectedList!.id);
      },
      error: (err) => {
        console.error('Błąd podczas zmiany statusu zadania:', err);
      },
    });
  }

  toggleDefaultTasks(): void {
    this.showDefaultTasks = !this.showDefaultTasks;
  }

  selectDefaultTask(task: {title: string; description: string}): void {
    this.selectedDefaultTask = task;
    this.selectedUserForDefaultTask = null;
  }

  addDefaultTask(): void {
    if (
      !this.selectedDefaultTask ||
      this.selectedUserForDefaultTask === null ||
      !this.selectedList
    ) {
      alert('Wybierz użytkownika i listę, aby dodać zadanie!');
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const taskToAdd: Partial<Task> = {
      title: this.selectedDefaultTask.title,
      description: this.selectedDefaultTask.description,
      assigned_to: this.selectedUserForDefaultTask,
      list_id: this.selectedList.id,
      due_date: today,
    };

    this.authService.addTask(taskToAdd).subscribe({
      next: () => {
        this.loadTasks(this.selectedList!.id);
        this.selectedDefaultTask = null;
        this.selectedUserForDefaultTask = null;
      },
      error: (err) => {
        console.error('Błąd podczas dodawania domyślnego zadania:', err);
      },
    });
  }

  cancelDefaultTask(): void {
    this.selectedDefaultTask = null;
    this.selectedUserForDefaultTask = null;
  }
}
