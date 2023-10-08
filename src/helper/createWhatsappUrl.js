export const createWhatsappUrl = (message, phone) => {

    // const phone = "6282244903917"
    // const message = "message testing coy"
    const url = `https://api.whatsapp.com/send/?phone=%2B${phone}&text=${message}&type=phone_number&app_absent=0`

    return url
}