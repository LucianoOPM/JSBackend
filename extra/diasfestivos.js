let holidays = ["03/12", "12/31", "09/16"]
let year = 2022
function countHours(year, holidays) {
    let diasAcumulados = 0
    for (let holiday of holidays) {
        let [month, day] = holiday.split("/")
        let date = new Date(year, month - 1, day)
        if (date.getDate() !== 0 && date.getDate() !== 6) {
            diasAcumulados += 2
        }
    }
    return diasAcumulados
}

let test = countHours(year, holidays)
console.log(test);