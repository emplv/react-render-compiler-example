import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AppPage from "./pages/AppPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AppPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
