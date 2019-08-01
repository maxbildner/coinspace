# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

harry = User.create({
    first_name: 'harry',
    last_name: 'hobart',
    state: 'New York',
    email: 'harry@gmail.com',
    password: '12345678'
})


demo_user = User.create({
    first_name: 'demo user',
    last_name: 'henry',
    state: 'New York',
    email: 'demo_user@gmail.com',
    password: '12345678'
})