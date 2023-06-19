const ageCalculator = birthdate => {
    const age = new Date(birthdate).getFullYear()
    const actualYear = new Date().getFullYear()
    return actualYear - age
}

module.exports = ageCalculator