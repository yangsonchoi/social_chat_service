import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; 
import './themes/default/main.scss';


export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/" element={<Main />} />
          <Route path="/" element={<Chat />} />
          <Route path="/" element={<Chat />} />
          <Route path="/" element={<Users />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
