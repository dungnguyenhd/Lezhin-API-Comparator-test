import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import V1 from './v1';
import V2 from './v2';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<V1/>} />
        <Route path="/v1" element={<V1/>} />
        <Route path="/v2" element={<V2 />} />
      </Routes>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById('root'));