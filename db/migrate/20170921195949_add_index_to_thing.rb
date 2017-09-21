class AddIndexToThing < ActiveRecord::Migration[5.1]
  def change
    add_index :things, [:amazon_link, :comment_id], unique: true
    add_index :things, [:subreddit, :created_utc]
    add_index :things, [:created_utc]
  end
end
