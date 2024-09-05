const CheckboxInput = ({ label, name, data, updateData}) => {
    const handleInput = (e) => {
        let value = e.target.checked

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
            <input
                id={name}
                checked={inputValue}
                onChange={handleInput}
                type="checkbox"
                name={name}
                />
            
            <label htmlFor={name}>{label}</label><br/>
        </>
    );
  };

  export default CheckboxInput