const BaseButton = ({ text, onClick, disable }) => {
    const bgClass = disable ? 'bg-gray-400' : 'bg-[#006FFD]'

    return (
        <div className={`rounded-xl ${bgClass} cursor-pointer text-sm text-white font-bold py-4 px-4 text-center`} onClick={onClick}>
            {text}
        </div>
    )
}

export default BaseButton