import React, { useEffect } from 'react'
import Mainrouter from './Mainrouter.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from './store/actions/useraction.jsx'


const App = () => {
  const dispacth = useDispatch()

  useEffect(()=>{
dispacth(authenticateUser())
        
    },[])

  return (
    <>
   
   <Mainrouter/>
   </>
  )
}

export default App



// import React, { useState } from 'react';

// function MyComponent()
// {
//    const [count, setCount] = useState(0);

//   // This is a valid hook call, inside a function component
//   const handleClick = () => {
//     // 🔴 Bad: Calling a hook inside an event handler
//     // This will throw an "Invalid Hook Call" error
//     // const [anotherCount, setAnotherCount] = useState(0); 
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={handleClick}>Increment</button>
//     </div>
//   );
// }

// export default MyComponent;