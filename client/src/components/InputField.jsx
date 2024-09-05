const InputField = ({ label, placeholder, name, type, data, updateData}) => {
  const handleInput = (e) => {
    let value = e.target.value

    updateData({
      ...data,
      [name]: value
    })
  }
  
  let inputValue = data[name]
  if(inputValue === null || inputValue === undefined)
    inputValue = ""

  return (
    <>
      <label htmlFor={name}>{label}</label><br/>
      <input
        value={inputValue}
        onInput={handleInput}
        type={type}
        placeholder={placeholder}
        name={name}
        />
      <br/>
    </>
  );
};

export default InputField