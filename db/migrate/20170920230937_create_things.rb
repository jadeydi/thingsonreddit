class CreateThings < ActiveRecord::Migration[5.1]
  def change
    create_table :things do |t|
      t.string :amazon_link
      t.string :amazon_image
      t.string :product_title
      t.text :body
      t.integer :score
      t.string :name
      t.string :author
      t.integer :downs
      t.integer :ups
      t.datetime :created_utc
      t.string :subreddit_id
      t.integer :controversiality
      t.string :subreddit

      t.timestamps
    end
  end
end
