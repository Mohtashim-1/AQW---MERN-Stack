import React, {useState} from 'react'


const page = () => {
const [count, setCount] = useState(0)
  return (
<div>
    <h1> Page</h1>
    <h1>{count}</h1>
    <button onClick={() => setCount(count + 1)}>Click me</button>
</div>
)
}

export default page