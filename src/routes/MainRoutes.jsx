import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Main from "../components/Main";

export default function MainRoutes() {
  return (
    <BrowserRouter basename={"/luxequality-test"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
