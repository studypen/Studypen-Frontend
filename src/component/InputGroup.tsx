import React, {FC} from 'react'
export type InputGroupProps = { label: string, errMsg: string, inputArg: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> }
export const InputGroup: FC<InputGroupProps> = ({ inputArg, label, errMsg }: InputGroupProps) => {

  return (
    <label className="input-group">
      <p>{label}</p>
      <div>
        <input {...inputArg} />
        <p className="error-msg">{errMsg}</p>
      </div>
    </label>
  )
}