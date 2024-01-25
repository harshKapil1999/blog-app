
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Layout from './Layout';
import SignUp from './SignUp';
import SignIn from './SignIn';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
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
