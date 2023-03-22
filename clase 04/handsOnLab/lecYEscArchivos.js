const { promises } = require('fs')
const fs = promises

let fetchJson = async () => {
    try {
        const fetchData = await fs.readFile("./clase 04/handsOnLab/data.json", "utf-8")
        const dataObj = JSON.parse(fetchData)
        const info = {
            contenidoStr: fetchData,
            contenidoObj: { ...dataObj },
            size: fetchData.length
        }
        //console.log(info)
        const infoToString = JSON.stringify(info, "null", 2)
        fs.writeFile("./clase 04/handsOnLab/info.json", infoToString, "utf-8")

    } catch (error) {
        console.log(error)
    }
}
fetchJson()