const BaseButton = ({ text, onClick }) => {
    return (
        <div className="rounded-xl bg-[#006FFD] cursor-pointer text-sm text-white font-bold py-4 px-4 text-center" onClick={onClick}>
            {text}
        </div>
    )
}

export default BaseButton