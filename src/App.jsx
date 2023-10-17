import './App.css'
import Login from "../Pages/Login"
import Home from "../Pages/Home"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from '../Components/Navbar';
import News from '../Pages/News';
import Papers from '../Pages/Papers';
import Test from '../Pages/Test';
import Faqs from '../Pages/Faqs';
import Blog from '../Pages/Blog';
import SingleBlog from '../Pages/SIngleBlog';
import { useSelector } from 'react-redux';
function App() {
  const user = useSelector((state) => state.current)
 
  return (
    <div className="Main">
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/">
            <Route index element={user ? <Home/>:<Navigate to="/login" replace></Navigate>}/>
            <Route path="/login"element={!user ? <Login/>:<Navigate to="/" replace></Navigate>} />
            <Route path='/News' element={<News />} />
            <Route path='/PastPapers' element={<Papers />} />
            <Route path='/Tests' element={<Test />} />
            <Route path='/Faqs' element={<Faqs />} />
            <Route path='/Blogs' element={<Blog />} />
            <Route path='/Blogs/:type/:id' element={<SingleBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
