import MainImg from '../../img/main_img.svg'

interface LogoProps {
  width: number
}

export default function Logo({width}:LogoProps) {
  
  return (
    <div>
        <img src={MainImg} alt="Pokeman landing page image" width={width}/>
    </div>
  )
}
