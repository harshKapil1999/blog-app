
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Layout from './Layout';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Post from './Post';
import PrivateRoutes from './PrivateRoutes';
import Profile from './components/profile';
import SelectedBlog from './SelectedBlog';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path='blog/:blogId' element={<SelectedBlog />}/>
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
      </Route>
    </>
    
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
