class AddIndexToThing < ActiveRecord::Migration[5.1]
  def change
    add_index :things, [:amazon_link, :comment_id], unique: true
  end
end
