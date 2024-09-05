const MultipleSelect = ({ label, name, data, updateData, options}) => {
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
      <select name={name} onInput={handleInput} value={inputValue}>
        {/*defaultValue="default" */}
        {/* <option value="default" disabled hidden>Válassz!</option> */}
        { Array.from(options.entries()).map(
          ([value, key]) =>
            <option value={value} key={value}>{key}</option>
        )}            
      </select><br/>
    </>
  );
};

export default MultipleSelect