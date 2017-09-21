class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.integer :score
      t.string :name
      t.string :author
      t.integer :downs
      t.integer :ups
      t.integer :year
      t.integer :month
      t.datetime :created_utc
      t.string :subreddit_id
      t.integer :controversiality
      t.string :subreddit

      t.timestamps
    end

    add_column :things, :comment_id, :string, index:true
    remove_column :things, :body
    remove_column :things, :name
    remove_column :things, :author
    remove_column :things, :downs
    remove_column :things, :ups
    remove_column :things, :created_at
    remove_column :things, :controversiality

    add_index :things, :subreddit
    add_index :things, :score
  end
end
