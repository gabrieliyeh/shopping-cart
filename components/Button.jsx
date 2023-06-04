const Button = ({children, type, onClick}) => {

  return (
    <button onClick={onClick} type={type} className='border rounded px-4 py-2 my-4 bg-green-800 text-gray-100 hover:bg-green-700'>
      {children}
    </button>
  )
}

export default Button
