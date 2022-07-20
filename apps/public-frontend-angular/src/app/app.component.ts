import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Todo, TodoModel } from '@mathlive-chat-poc/models';
import { UserService } from '@mathlive-chat-poc/frontend-tools';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';


@Component({
  selector: 'mathlive-chat-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todos$!: Observable<Todo[]>;
  public todos: Todo[] = [];
  public loading$: Observable<boolean> = of(true);

  /**
   * Error management
   */
   errors: {
    somethingIsBroken: { // handle HTTP errors
      statusCode: string,
      statusMessage: string
    }
  } = {
    somethingIsBroken: {
      statusCode: '',
      statusMessage: ''
    }
  };

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.todos$ = this.userService.getAllTodos()
      .pipe(
        // tap((todos: TodoModel[]) => console.log(todos))
        // filter()
        catchError((error: HttpErrorResponse) => {
          // console.error(error);
          this.errors.somethingIsBroken.statusCode = error.error?.status ?? '0';
          this.errors.somethingIsBroken.statusMessage = error.error?.message ?? 'Unknown error';

          return throwError(() => error);
        })
      );

    // this.getAllTodos();
  }

  getAllTodos(): void {
    this.userService.getAllTodosFromBackend().subscribe({
      next: (t: TodoModel[]) => {
        this.todos = t;
      },
      error: (error: HttpErrorResponse) => {
        this.errors.somethingIsBroken.statusCode = error.error?.status ?? '0';
        this.errors.somethingIsBroken.statusMessage = error.error?.message ?? 'Unknown error';
      },
      complete: () => {
        // nothing here
      }
    });
  }

  getAllTodosPromise(): void {
    this.userService.getAllTodosFromBackendPromise()
      .then((t: TodoModel[]) => {
        this.todos = t;
      }).catch((error: HttpErrorResponse) => {
        this.errors.somethingIsBroken.statusCode = error.error?.status ?? '0';
        this.errors.somethingIsBroken.statusMessage = error.error?.message ?? 'Unknown error';
      }).finally(() => {
        // nothing here
      });
  }

  addTodo(): void {
    this.userService.addTodo().pipe(
      map((newTodo: TodoModel) => {
        const todoWellFormatted = new TodoModel(
          newTodo.title
        );

        return todoWellFormatted;
      })
    ).subscribe({
      next: (newTodo: TodoModel) => {
        this.userService.refreshTodosList();
      },
      error: (error: HttpErrorResponse) => {
        // console.error(error);
        this.errors.somethingIsBroken.statusCode = error.error?.status ?? '0';
        this.errors.somethingIsBroken.statusMessage = error.error?.message ?? 'Unknown error';
      },
      complete: () => {
        // @TODO
      }
    });
  }
}
