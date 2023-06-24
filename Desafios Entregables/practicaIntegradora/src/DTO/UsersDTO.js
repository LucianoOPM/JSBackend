class UserDto {
    constructor(first_name, last_name, email, cartID, birthdate, role, _id) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.cartID = cartID.toString()
        this.age = this.#ageCalculator(birthdate)
        this.role = role
        this.IDUser = _id.toString();
    }

    #ageCalculator = (birthdate) => {
        const age = new Date(birthdate).getFullYear()
        const actualYear = new Date().getFullYear()
        return actualYear - age;
    }
}

module.exports = UserDto