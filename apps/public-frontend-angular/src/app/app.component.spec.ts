import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { VendorsModule } from '@mathlive-chat-poc/vendors';
import { getTodoMock, getUserMock } from '@mathlive-chat-poc/models';
import { TodoModel, User, UserService } from '@mathlive-chat-poc/frontend-tools';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// Fake user
const mockedUser: User = getUserMock();
// Fake todos
const mockedTodos: TodoModel[] = [
  getTodoMock({title: 'Todo 1'}),
  getTodoMock({title: 'Todo 2'}),
  getTodoMock({title: 'Todo 3'}),
];

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const userServiceMock = {
    getAllTodosFromBackend: jest.fn().mockReturnValue(of(mockedTodos)),
    getAllTodosFromBackendPromise: jest.fn().mockReturnValue(new Promise(resolve => resolve(getTodoMock({title: 'Todo 4'})))),
    getAllTodos: jest.fn().mockReturnValue(of(mockedTodos)),
    addTodo: jest.fn().mockReturnValue(of(getTodoMock({title: 'Todo 4'}))),
    refreshTodosList: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        VendorsModule
      ],
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the app', () => {
    expect(app).toBeTruthy();
  });

  it(`renders title 'Todos'`, () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Todos'
    );

    // alternative
    const { debugElement } = fixture;
    const title = debugElement.query(By.css('h1'));

    expect(title.nativeElement.textContent).toContain(
      'Todos'
    );
  });

  xit('gets and renders all the todos (standard mode with this.getAllTodos(); in ngOnInit)', async () => {
    expect(userServiceMock.getAllTodosFromBackend).toHaveBeenCalled();
    await fixture.whenStable();
    expect(app.todos).toEqual(mockedTodos);

    const { debugElement } = fixture;
    const addButton = debugElement.query(By.css('#add-todo'));

    expect(addButton).toBeTruthy();
  });

  it('gets and renders all the todos (rxjs mode - better :))', async () => {
    expect(userServiceMock.getAllTodos).toHaveBeenCalled();
    await fixture.whenStable();

    const { debugElement } = fixture;
    const todosElements = debugElement.queryAll(By.css('li'));
    const addButton = debugElement.query(By.css('#add-todo'));

    expect(todosElements.length).toEqual(3);
    expect(addButton).toBeTruthy();
  });

  it('console.error(\'get Todos Error!\') when an error is thrown while getting todos', async () => {
    const status = '500';
    const statusText = 'Server error';
    const httpError = new HttpErrorResponse({
      statusText,
      error: { message: statusText, status }
    });

    // alter mock to return an error
    userServiceMock.getAllTodosFromBackend = jest.fn().mockReturnValue(throwError(() => httpError));
    // jest.spyOn(console, 'error'); // if we want to console.error

    app.getAllTodos();

    await fixture.whenStable();
    fixture.detectChanges();

    const { debugElement } = fixture;
    const somethingIsBroken = debugElement.query(By.css('mathpoc-something-is-broken'));

    // expect(console.error).toHaveBeenCalledWith(httpError);
    expect(somethingIsBroken).toBeTruthy();
    expect(app.errors.somethingIsBroken.statusCode).toBe(status.toString());
    expect(app.errors.somethingIsBroken.statusMessage).toBe(statusText);

    // @TODO test all branches (see file:///Users/nmura/dev/perso/deveryware/evalme-front-nmu/coverage/evalme-front/src/app/user/user-list/user-list.component.ts.html)
    // ...

    // restore original mock
    userServiceMock.getAllTodosFromBackend = jest.fn().mockReturnValue(of(mockedTodos));
  });

  it('displays error message when an error is thrown while getting todos', async () => {
    const status = '500';
    const statusText = 'Server error';
    const httpError = new HttpErrorResponse({
      statusText,
      error: { message: statusText, status }
    });

    // alter mock to return an error
    userServiceMock.getAllTodos = jest.fn().mockReturnValue(throwError(() => httpError));
    // jest.spyOn(console, 'error'); // if we want to console.error

    // app.getAllTodos();
    app.ngOnInit();

    await fixture.whenStable();
    fixture.detectChanges();

    const { debugElement } = fixture;
    const somethingIsBroken = debugElement.query(By.css('mathpoc-something-is-broken'));

    // expect(console.error).toHaveBeenCalledWith(httpError);
    expect(somethingIsBroken).toBeTruthy();
    expect(app.errors.somethingIsBroken.statusCode).toBe(status.toString());
    expect(app.errors.somethingIsBroken.statusMessage).toBe(statusText);

    // @TODO test all branches (see file:///Users/nmura/dev/perso/deveryware/evalme-front-nmu/coverage/evalme-front/src/app/user/user-list/user-list.component.ts.html)
    // ...

    // restore original mock
    userServiceMock.getAllTodos = jest.fn().mockReturnValue(of(mockedTodos));
  });

  xit('console.error(\'get Todos Error!\') when an error is thrown while getting todos (Promise) - DOES NOT WORK', async () => {
    // alter mock to return a Promise.reject
    userServiceMock.getAllTodosFromBackendPromise = jest.fn().mockReturnValue(new Promise((resolve, reject) => reject('get Todos Error!')));
    jest.spyOn(console, 'error');

    try {
      await app.getAllTodosPromise();
    } catch (e) {
      expect(console.error).toHaveBeenCalledWith('get Todos Error!');
    }

    // restore mock to return a Promise.resolve
    userServiceMock.getAllTodosFromBackendPromise = jest.fn().mockReturnValue(new Promise(resolve => resolve(mockedTodos)));
  });

  it('should add a todo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const { debugElement } = fixture;
    const addButton = debugElement.query(By.css('#add-todo'));

    addButton.triggerEventHandler('click', {});
    expect(userServiceMock.addTodo).toHaveBeenCalled();
    // expect(userServiceMock.getAllTodosFromBackend).toHaveBeenCalled(); // with standard method
    expect(userServiceMock.refreshTodosList).toHaveBeenCalled(); // with rxjs method
  });``

  xit('@TODO à tester avec le login', async () => {
    // component.userForm.controls['firstName'].setValue('John');
    // component.userForm.controls['lastName'].setValue('Doe');
    // component.userForm.controls['email'].setValue('j.d@gmail.com');
    // component.onSubmit();

    // tick();
    // fixture.detectChanges();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
