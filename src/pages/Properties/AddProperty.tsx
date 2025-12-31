import PropertyForm from './PropertyForm'

const AddProperty = ({onSuccess}:{onSuccess: () => void}) => {
  return (
    <PropertyForm onSuccess={onSuccess}/>
  )
}

export default AddProperty