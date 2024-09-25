# CGS Test project

## Project main stack

#### Backend:

Express, Typescript, Postresql, Prisma ORM, Passport. </br>

#### Frontend:

React, Typescript, Zustand, React Final Form, Blueprint, Emotion CSS.

## Project commands

`cd packages/backend` - jump to your backend folder <br />
`yarn` - install dependencies <br />
`yarn serve` - run your backend <br />
`cd packages/frontend` - jump to your frontend folder <br />
`yarn` - install dependencies <br />
`yarn dev` - run your frontend <br />

## Pre requirements

If you keep experiencing something like: **tslint: command not found**
please do the following:

```

yarn global add tslint typescript

```

link: https://stackoverflow.com/questions/36910592/enabling-eslint-on-typescript-files/64175035#64175035

## Time-frames

Time-frames of the test task is highly important! You have only 2 weeks for the task below, please use this time wisely. Good luck!

## Required features

1. **Todo list - CRUD operations on backend**;

- _Each `PUT` `POST` rout should has validation of `req.body` and throw `400` error in case of failed validation_
- _Separate your logic from routes. You should perform all interactions with `DB` inside your `services/<filename>.service.ts` file and import it to `controllers/<filename>.controller.ts`. After that you can call your controllers in routes_
- _Create GENERIC validator, isExist (for put, delete and get by id), tryCatch middlewares_

2. **Todo list - Connect your CRUD operations with frontend**;

- _You should split your code on logical components ( `<TodoContainer />`, `<TodoElement/>` etc);_
- _For Edit/Add you should use forms written with [React Final Form](https://final-form.org/docs/react-final-form/getting-started), [Formik](https://formik.org/docs/overview), [React Hook Form](https://www.react-hook-form.com/get-started);_
- \_Put logic related to server interactions inside `service/http.ts`
- _Use [Zustand]for managing your application state;_
- _Todo list page should have different behaviors on different devices. Desktop - should be displayed as a table, Tablet - should be as slider, Mobile - list._
- _Your font sizes, colors, margins, paddings should be in THEME const_
- _Create `ROUTER_KEYS` const for routing_
- _Create `FONTS` and `COLORS` const for storing your fonts and colors_
- _Use [Emotion CSS](https://emotion.sh/docs/introduction) in order to style your components_
- _Design should be tablet and mobile adaptive_

3. **Authorization (login/signup) backend;**

- _Use jwt [authorization](https://nodejsdev.ru/doc/jwt/) and [Passport](http://www.passportjs.org/) for that_
- _User should have username, password and email_
- _Logic related to token processing should be stored in `middlewares/auth.middleware.ts`_
- _Private todos should be accessible only for Todo creators_
- _Public todos should be accessible for all users. CRUD operations of public todos is accessible only for owner. Public todos is accessible only for reading for all users_
- _You should implement account verification functionallity via email_
- _Change password endpoint_
- _Forgot password endpoint. Reseting password demands a special link, which you should send via email_

4. **Authorization (login/signup) frontend;**

- _Should store token in localStorage_
- _You have to devide your routes into 2 groups: public and private. Private routes should be accessible only for user, who is logged in. Public routes should be accessible for all users_
- _Create `STORAGE_KEYS` const for storing your local storage keys_
- _Use React Final Form for handling validation and submit func_
- _Extend your http service for interacting with auth requests (check our codestyle)_
- _Integrate logout and edit user information UI (like username and password)_

5. **Filters for todo list by title and statuses (private and completed);**

- _You should pass filter params through `req.params`(`localhost:3000/todo?search=test&status=completed`)_
- _Connect backend filtration with UI components_

6. **Button pagination;**

- _All pagination should be handled by backend_
- _Change frontend request with pagination params_
- _Pagination should be done differently on different devices. Desktop - button pagination, Tablet - horizontal scroll pagination, Mobile - vertical scroll pagination_
