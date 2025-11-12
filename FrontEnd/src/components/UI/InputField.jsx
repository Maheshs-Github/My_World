import React from 'react'

const InputField = ({label,name,placeholder,value,onChange}) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor={name} className='font-medium'>{label}</label>
      <input type="text" name={name} className='p-2 border-2 rounded-sm' placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}

export default InputField;
