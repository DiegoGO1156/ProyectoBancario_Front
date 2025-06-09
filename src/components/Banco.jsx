import banco from '../assets/banco-plaza.jpg';

export const Banco = ({text}) => {
    return (
        <div className="">
            <img src={banco} alt="Banco-plaza" />
            <span>{text}</span>
        </div>
    )
}