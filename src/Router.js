import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import variables from './styles/variables';
import { darkMode, whiteMode } from './styles/theme';

import SignIn from './pages/signIn/Signin';
import Signup from './pages/signup/Signup';
import Todo from './pages/todo/Todo';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.themestyle?.backgroundColor};
  color: ${props => props.theme.themestyle.textColor};
  ${variables.flex({ direction: 'column' })}
`;

function Router() {
  return (
    <ThemeProvider theme={{ themestyle: darkMode, variables }}>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default Router;
