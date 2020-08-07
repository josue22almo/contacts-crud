# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

contacts = Contact.create([
  {
    firstName: "Papayote",
    lastName: "Loquete",
    phoneNumber: "674989899878",
    email: "papayoteloquete@contacts.com"
  },
  {
    firstName: "Rual",
    lastName: "Meireles",
    phoneNumber: "0000496997",
    email: "raulmeireles@contacts.com"
  },
])
