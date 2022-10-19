type InpuProps = {
  placeholder: string
  isValid?: boolean
  errorMessage?: string
}
export const Input = ({
  placeholder,
  isValid = true,
  errorMessage,
}: InpuProps) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder={placeholder}
        className={'w-full mb-2 ' + (isValid ? '' : 'error ')}
      />
      {!isValid && (
        <span className="ml-1 mb-2 text-red-400">{errorMessage}</span>
      )}
    </div>
  )
}
