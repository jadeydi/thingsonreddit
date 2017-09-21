require 'csv'
require 'digest'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
rows = CSV.foreach('db/fixtures/things.csv', headers: true)
rows.each do |r|
  md5 = Digest::MD5.new
  md5 << r['thread_id']
  thread_hash = md5.hexdigest
  comment = Comment.find_or_create_by(thread_id_hash: thread_hash) do |comment|
    comment.body = r['body']
    comment.score = r['score']
    comment.name = r['name']
    comment.author = r['author']
    comment.downs = r['downs']
    comment.ups = r['ups']
    comment.month = r['month']
    comment.year = r['year']
    comment.created_utc = r['created_utc']
    comment.subreddit_id = r['subreddit_id']
    comment.controversiality = r['controversiality']
    comment.subreddit = r['subreddit']
    comment.thread_id = r['thread_id']
  end
  thing = Thing.create!(
    original_link: r['original_link'],
    amazon_link: r['amazon_link'],
    amazon_image: r['amazon_image'],
    product_title: r['product_title'],
    score: r['score'],
    month: r['month'],
    year: r['year'],
    subreddit_id: r['subreddit_id'],
    subreddit: r['subreddit'],
    comment_id: thread_hash,
  )

end
