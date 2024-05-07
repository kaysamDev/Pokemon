import MainImg from '../../img/main_img.svg'

export default function Logo({width}:any) {
  return (
    <div>
        <img src={MainImg} alt="Pokeman landing page image" width={width}/>
    </div>
  )
}
