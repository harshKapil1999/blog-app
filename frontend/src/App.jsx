
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Layout from './Layout';
import SignUp from './SignUp';
import SignIn from './SignIn';
//import Header from './components/header';
import Footer from './components/footer';

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
      {/* <Header /> */}
      <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App
