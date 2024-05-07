export default function Name({size, selectedColor}:any) {

  return (
    <>
      <h1 className='py-4' style={{fontSize: `${size}px`}}>Poké<span className={`text-${selectedColor}`}>book</span></h1>
    </>
  )
}
