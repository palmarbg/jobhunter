import CheckboxInput from "./components/CheckboxInput"
import InputField from "./components/InputField"
import MultipleSelect from "./components/MultipleSelect"
import NumericInputField from "./components/NumericInputField"
import TextareaInput from "./components/TextareaInput"

export const ROLES = new Map([
  ['company', 'Munkáltató'],
  ['jobseeker', 'Munkaválaló']
])

export const JOBTYPES = new Map([
  ['', ''],
  ['full-time', 'Teljesmunkaidő'],
  ['part-time', 'Részlegesmunkaidő'],
  ['contract', 'Szerződéses'],
  ['internship', 'Gyakornok'],
])

export const inputBuilderFactory = (formData, setFormData) => {
  return (label, name, type, options) => {
    const props = {
      placeholder: "",
      data: formData,
      updateData: setFormData,
      label,
      name,
      ...options
    }
    switch (type) {
      case "number":
        return <NumericInputField {...props}/>
      case "checkbox":
        return <CheckboxInput {...props}/>
      case "textarea":
        return <TextareaInput {...props}/>
      case "select":
        return <MultipleSelect {...props}/>
      default:
        return <InputField {...{...props, type}}/>
    }
  }
}