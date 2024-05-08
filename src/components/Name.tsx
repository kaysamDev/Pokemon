interface NameProps {
  size: number
  selectedColor: string | void
}
export default function Name({size, selectedColor}:NameProps) {

  return (
    <>
      <h1 className='py-4' style={{fontSize: `${size}px`}}>Poké<span style={{color: `${selectedColor}`}}>book</span></h1>
    </>
  )
}
