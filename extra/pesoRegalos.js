const packOfGifts = ["book", "doll", "ball"]
const reindeers = ["dasher", "dancer"]


function distributeGifts(packOfGifts, reindeers) {
    let pesoRegalos = packOfGifts.reduce((acc, gift) => acc + gift.length, 0)
    let cargamentoRenos = reindeers.reduce((acc, reindeer) => acc + reindeer.length * 2, 0)

    return Math.floor(cargamentoRenos / pesoRegalos)
}

let test = distributeGifts(packOfGifts, reindeers)
console.log(test);