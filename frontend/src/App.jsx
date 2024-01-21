import axios from 'axios';
import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  let [data, setData] = useState('');
  axios.get(`http://localhost:3000/api/hello`)
    .then(res => {
      console.log(res)
      setData(res.data);
    })
    .catch(error => console.log(error))

  return (
    <div className="bg-gray-950 w-full h-screen text-gray-300">
      <div>
        <h1 className="text-3xl text-center pt-2">Blog App</h1>
        <p>{data}</p>
        <Button variant="destructive">Shadcn/ui</Button>
      </div>
    </div>
  )
}

export default App
