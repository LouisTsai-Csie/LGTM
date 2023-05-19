import { ChakraProvider } from '@chakra-ui/react';
import Menu from './layout/menu/index';
import CreateGroup from './layout/create/index';
import GroupPage from './layout/group';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/creategroup" element={<CreateGroup />} />
          <Route path="/grouppage" element={<GroupPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
