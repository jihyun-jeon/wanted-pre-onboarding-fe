import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import variables from './styles/variables';

import SignIn from './pages/signIn/Signin';
import Signup from './pages/signup/Signup';
import Todo from './pages/todo/Todo';
import { Provider } from 'react-redux';
import store from './store/todoData';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #dbcaca;
  color: black;
  ${variables.flex({ direction: 'column' })}
`;

function Router() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/todo" element={<Todo />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Container>
    </>
  );
}

export default Router;
