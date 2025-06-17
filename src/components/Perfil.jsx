import perfil from '../assets/Perfil.png';

export const Perfil = ({text}) => {
    return (
        <div className="">
            <img src={perfil} alt="perfil"
                height={"60px"}
                width={"80px"}
            />
            <span>{text}</span>
        </div>
    )
}