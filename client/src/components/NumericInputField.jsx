const NumericInputField = ({ label, placeholder, name, data, updateData}) => {
  const handleInput = (e) => {
    let value = parseInt(e.target.value) || ""

    updateData({
      ...data,
      [name]: value
    })
  }
  
  let inputValue = data[name]
  if(isNaN(inputValue))
    inputValue = ""
  
  return (
    <>
      <label htmlFor={name}>{label}</label><br/>
      <input
        value={inputValue ?? ""} 
        onInput={handleInput}
        type="number"
        placeholder={placeholder}
        name={name}
        />
      <br/>
    </>
  );
};

  export default NumericInputField