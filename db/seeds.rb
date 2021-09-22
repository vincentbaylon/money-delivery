Pick.destroy_all
Card.destroy_all
User.destroy_all

User.create(name: 'Joer')
User.create(name: 'Jason')
User.create(name: 'Joepoe')
User.create(name: 'Ryan')
User.create(name: 'Vince')

puts 'Done seeding'