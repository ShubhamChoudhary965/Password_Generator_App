import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(6)
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const password_ref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*-_~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
      
    }

    setPassword(password)


  }, [length, number, character, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    password_ref.current?.select();
    password_ref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  return (
    <>
    <div className="w-full h-screen max-w-md mx-auto shadow-xl px-4 py-5 border-1 shadow-blue-800 ">
      <h1 className='text-center my-4 text-3xl font-bold mb-8 underline'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 shadow-indigo-500/85">
        <input
            type="text"
            value={password}
            className="outline-none w-full p-2 text-lg font-bold "
            placeholder="Password"
            readOnly
            ref={password_ref}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 font-bold shadow-md shadow-indigo-500/85'
        >Copy</button>
        
    </div>
      <div className='flex items-center gap-x-1 w-full'>
          <label className='font-bold text-2xl p-3'>Length: {length}</label>
        <input 
        type="range"
        min={6}
        max={50}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setNumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput" className='text-2xl font-bold'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                  setCharacter((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput" className='text-2xl font-bold'>Characters</label>
      </div>
      <div className='mt-8'>
        <img src='password.jpg' className='rounded-3xl'/>
      </div>
      <h2 className='text-center mt-10 text-3xl font-bold text-purple-900'>Secure <span className='text-4xl font-bold text-red-600'>Your</span> <br/> Password</h2>
    </div>
    </>
  )
}

export default App