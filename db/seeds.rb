require 'csv'
require 'digest'
require 'enumerator'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
N_ROWS = 1000
rows = CSV.foreach('../things_cleaned.csv', headers: true)
rows.each_slice(N_ROWS) do |chunk|
  start = Time.now
  result = Upsert.batch(Comment.connection, :comments) do |upsert|
    chunk.each do |r|
      upsert.row({ thread_id_hash: r['thread_id_hash'] }, {
        body: r['body'],
        score: r['score'],
        name: r['name'],
        author: r['author'],
        downs: r['downs'],
        ups: r['ups'],
        month: r['month'],
        year: r['year'],
        created_utc: r['created_utc'],
        subreddit_id: r['subreddit_id'],
        controversiality: r['controversiality'],
        subreddit: r['subreddit'],
        thread_id: r['thread_id'],
        thread_id_hash: r['thread_id_hash'],
        created_at: Time.now,
        updated_at: Time.now,
      })
    end
  end

  Upsert.batch(Thing.connection, :things) do |upsert|
    chunk.each do |r|
      upsert.row({ amazon_link: r['amazon_link'], comment_id: r['thread_id_hash'] }, {
        original_link: r['original_link'],
        amazon_image: r['amazon_image'],
        product_title: r['product_title'],
        score: r['score'],
        month: r['month'],
        year: r['year'],
        author: r['author'],
        subreddit_id: r['subreddit_id'],
        subreddit: r['subreddit'],
        comment_id: r['thread_id_hash'],
        created_utc: r['created_utc'],
        updated_at: Time.now,
      })
    end
  end
  e = Time.now
  puts "Comments: #{Comment.count}"
  puts "Things: #{Thing.count}"
  puts "Processed #{N_ROWS} in #{e - start} seconds"
end

