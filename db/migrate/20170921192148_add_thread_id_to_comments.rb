class AddThreadIdToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :thread_id_hash, :string
    add_column :comments, :thread_id, :string

    add_index :comments, :thread_id_hash, unique: true
  end
end
