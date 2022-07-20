// https://braydoncoyer.dev/blog/how-to-unit-test-an-http-service-in-angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { getTodoMock } from '@mathlive-chat-poc/models';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { environment } from '../../environment';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';
import { WebSocketService } from './websocket.service';
import { TodoModel } from '../models/todo.model';

// Fake todos
const mockedTodos: TodoModel[] = [
  getTodoMock()
];

const todosListUrl = `${environment.backendApi.baseUrlTodo}`; // should be http://localhost:3334/api/todos

// Fake todos and response object - alt
// const todos = [
//   'shop groceries',
//   'mow the lawn',
//   'take the cat to the vet'
// ];
// const okResponse = new Response(JSON.stringify(todos), {
//   status: 200,
//   statusText: 'OK',
// });

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
	let httpMock;

  // @TODO to be finished
  const errorHandlingServiceMock = {
    handleError: jest.fn()
    // handleError: jest.fn().mockReturnValue(throwError({
    //   status: 401,
    //   message: 'You are not logged in',
    // }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers:[
        { provide: NotificationService, useValue: {} },
        { provide: LocalStorageService, useValue: {} },
        { provide: WebSocketService, useValue: {} },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceMock },
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // httpTestingController.verify();
    errorHandlingServiceMock.handleError.mockClear(); // used to reset spies state through different tests (otherwise toHaveBeenCalledTimes() gets wrong)
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('gets all the todos from API', () => {
    let actualTodos: TodoModel[] | undefined;

    userService.getAllTodosFromBackend().subscribe(
      (todos: TodoModel[]) => {
        actualTodos = todos;
      }
    );

    const request = httpTestingController.expectOne(todosListUrl);
    request.flush(mockedTodos);

    expect(request.request.method).toEqual('GET');
    expect(actualTodos).toEqual(mockedTodos);
  });

  it('gets all the todos from API (Promise)', () => {
    let actualTodos: TodoModel[] | undefined;

    // make HTTP call take flight
    userService.getAllTodosFromBackendPromise().then((response: TodoModel[]) => {
      actualTodos = response;
    });

    // use the request’s flush method to respond with fake data. This simulates a successful “200 OK” server response.
    const request = httpTestingController.expectOne(todosListUrl);

    // answer the request so the Observable emits a value.
    request.flush(mockedTodos);

    expect(request.request.method).toEqual('GET');

    process.nextTick(() => { // needed for Promises
      // Now verify emitted valued.
      expect(actualTodos).toEqual(mockedTodos);
    });
  });

  // it('gets all the todos from API - alt (Promise)', async () => {
  //   // Arrange
  //   userService = new UserService(null as any, {} as any, {} as any, {} as any, {} as any, {} as any);
  //   // const getAllTodosFromBackendPromiseSpy = jest.spyOn(userService, 'getAllTodosFromBackendPromise').mockResolvedValue(okResponse);
  //   const getAllTodosFromBackendPromiseSpy = jest.spyOn(userService, 'getAllTodosFromBackendPromise').mockReturnValue();

  //   // Act
  //   const actualTodos = await userService.getAllTodosFromBackendPromise();

  //   // Assert
  //   expect(actualTodos).toEqual(todos);
  //   expect(fetchSpy).toHaveBeenCalledWith('/todos');
  // });

  it('calls handleError() method on error', () => {
    const status = 500;
    const statusText = 'Server error';

    userService.getAllTodosFromBackend().subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: () => {
        // service.handleError must be called
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    const request = httpTestingController.expectOne(todosListUrl);

    request.flush(mockedTodos, { status, statusText });

    expect(errorHandlingServiceMock.handleError).toHaveBeenCalledTimes(1);
  });

  it('calls handleError() method on error (Promise)', async () => {
    const status = 500;
    const statusText = 'Server error';

    // make HTTP call take flight
    userService.getAllTodosFromBackendPromise()
      .then(() => {
        fail('then handler must not be called');
      })
      .catch((error: HttpErrorResponse) => {
        // service.handleError must be called
        expect(errorHandlingServiceMock.handleError).toHaveBeenCalledWith(error);
      })
      .finally(() => {
        // finally handler is always called :)
      });

    const req = httpTestingController.expectOne(todosListUrl);

    req.flush(mockedTodos, { status, statusText });

    expect(errorHandlingServiceMock.handleError).toHaveBeenCalledTimes(1);
  });
});
