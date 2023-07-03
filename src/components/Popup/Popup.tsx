import './Popup.style.css'

export type IPopupProps = {
  open: boolean
  onSubmit: () => void
  onClose: () => void
  title: string
  children?: React.ReactNode
}

export default function Popup({ open, onSubmit, onClose, children, title }: IPopupProps) {
  return (
    <div className={`dialog-backdrop ${open ? 'open' : ''}`}>
      <div className='dialog'>
        <h1>{title}</h1>
        {children}
        <div className='dialog-button'>
          <button onClick={onSubmit}>Share</button>
          <button className='danger' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
