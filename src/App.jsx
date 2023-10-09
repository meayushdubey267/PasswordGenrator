import { useState , useCallback, useEffect , useRef} from 'react'



function App() {
  const [ length, setlength] = useState(8);
  const [numbersAllowed , Setnumbersallowed] = useState(false);
  const [charAllowed , Setcharallowed] = useState(false);
  const [password,setPassword] = useState("");


  const passwordRef = useRef(null)


  const passwordgenerator = useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbersAllowed) str+="0123456789"

    if(charAllowed) str+="`~!@#$%^&**()_-+={[}]|\:;?/<,>."

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)


  } , [length,numbersAllowed,charAllowed, setPassword])
  
  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)} , [password])

  useEffect (() => { passwordgenerator() }, [length,numbersAllowed,charAllowed,passwordgenerator])

  return (
    <>

      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400
       bg-gray-700' >

       <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>

       <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input type="text" value={password} className='outline-none w-full px-3 py-1' placeholder='Password' readOnly/>

        <button onClick={copyPasswordtoClipboard}
        className=' hover:bg-blue-600 hover:text-black outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

       </div>

       <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={50} value={length} className='cursor-pointer' 
              onChange={(e) =>{setlength(e.target.value)}}
            />
            <label >Length : {length}</label>
          </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numbersAllowed} id="numberInput" 
          onChange={() =>{Setnumbersallowed((prev) =>!prev);
          }}/>
          <label htmlFor='NumberInput'>Numbers</label>

          <div className='flex items-center gap-x-1 '>
              <input type='checkbox' defaultChecked={charAllowed} id="characterInput"
                onChange={() =>{Setcharallowed((prev) => !prev);
                }}/>
              
              <label htmlFor='CharacterInput'>Characters</label>

          </div>

        </div>


       </div>
       
       
       
       </div>
    </>
  )
}

export default App
