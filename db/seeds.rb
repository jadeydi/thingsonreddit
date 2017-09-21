require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
rows = CSV.foreach('db/fixtures/things.csv', headers: true)
Thing.create(rows.map { |r|
  {
    amazon_link: r['amazon_link'],
    amazon_image: r['amazon_image'],
    product_title: r['product_title'],
    body: r['body'],
    score: r['score'],
    name: r['name'],
    author: r['author'],
    downs: r['downs'],
    ups: r['ups'],
    created_utc: r['created_utc'],
    subreddit_id: r['subreddit_id'],
    controversiality: r['controversiality'],
    subreddit: r['subreddit'],
  }
})
