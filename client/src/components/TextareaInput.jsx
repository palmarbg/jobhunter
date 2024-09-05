const TextareaInput = ({ label, placeholder, name, type, data, updateData, rows, cols}) => {
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
      <textarea
        value={inputValue}
        onInput={handleInput}
        type={type}
        placeholder={placeholder}
        name={name}
        rows={rows}
        cols={cols}
        />
      <br/>
    </>
  );
};

export default TextareaInput