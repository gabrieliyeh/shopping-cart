function Input ({type, value, required, onChange}){
  return (
    <input 
    type={type}
    value={value}
    required={required}
    onChange={onChange}
    className='border rounded px-3 py-1 w-80 focus:outline-none '
     />
  )
}

export default Input