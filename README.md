# Boilerplate-React
### A React boilerplate with SSR + Code Splitting + All the packages we learned to love

This is a boilerplate project in React utilizing [React Universal Component](https://github.com/faceyspacey/react-universal-component) for SSR and code splitting plus+ all the packages you learned to love, like [Material-UI](https://github.com/mui-org/material-ui), [Redux-First Router](https://github.com/faceyspacey/redux-first-router) and [Redux-Saga](https://github.com/redux-saga/redux-saga).

### Packages:

- [Redux](https://github.com/reduxjs/redux) *Fully implemented*
- [Redux-First Router](https://github.com/faceyspacey/redux-first-router) *Fully implemented*
- [Redux-Saga](https://github.com/redux-saga/redux-saga) *Fully implemented*
- [Material-UI](https://github.com/mui-org/material-ui) *Fully implemented*
- [Styled-Components](https://github.com/styled-components/styled-components) *Not implemented*
- [Axios](https://github.com/axios/axios) *Not implemented*
- Jest

### Additionally, we use:

- [Babel](https://github.com/babel/babel) (7.x) *Fully implemented*
- [Webpack](https://github.com/webpack/webpack) (4.x) *Fully implemented*

## Usage

- Just clone the project and run:

```
yarn && yarn start
```

## Notes

- This is a work in progress, fundamentals aspects of this project can and will change drastically.
- The project structure follows (or at least tries to follow) the principles described in [this article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

## Todo

- Implement airbnb rules in ESLint.
- Structure the project accordingly to [this article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

## Packages being considered

- Formik
- Apollo
- Commitizen

## Contributing

- Feel free to contribute to this project! We are currently looking foward to implement all items in the todo list above, so feel free to open a PR.

## Issues

- Latest [babel-watch](https://www.npmjs.com/package/babel-watch) version (2.0.7) doesn't support babel 7, so we are using a [fork](https://github.com/monathur/babel-watch) which do supports it, refer to this [issue](https://github.com/kmagiera/babel-watch/issues/75#issuecomment-424294426) for more information.
