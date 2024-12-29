import {
  AuthorForm,
  CategoriesForm,
  Dashboard,
  LoginPage,
  SeriesForm,
  SignupPage,
  SiteInfoForm,
  TagsForm,
} from "./pages";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import React from "react";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/site-info" element={<SiteInfoForm />} />
          <Route path="/author" element={<AuthorForm />} />
          <Route path="/categories" element={<CategoriesForm />} />
          <Route path="/tags" element={<TagsForm />} />
          <Route path="/series" element={<SeriesForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
