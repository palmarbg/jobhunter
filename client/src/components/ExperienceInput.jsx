import TextareaInput from "./TextareaInput";

const ExperienceInput = ({ label, placeholder, name, data, updateData}) => {
  const handleInput = textValue => {
    let dataValue = textToData(textValue.text)

    updateData({
      ...data,
      [name]: dataValue
    })
  }
  
  let inputValue = data[name]
  if(inputValue === null || inputValue === undefined)
    inputValue = ""

  return (
    <TextareaInput
      label={label}
      placeholder={placeholder}
      name="text"
      type="text"
      data={{text: dataToText(data[name])}}
      updateData={handleInput}
      rows={10}
      cols={80}
      />
  );
};

export default ExperienceInput

const dataToText = data => 
  data.map(item => `${item.company || ""};${item.title || ""};${item.interval || ""}`).join('\n');

const textToData = text =>
  text.split('\n').map(line => {
    const [company, title, interval] = line.split(';');
    return {
      company: company || "",
      title: title || "",
      interval: interval || ""
    };
  })