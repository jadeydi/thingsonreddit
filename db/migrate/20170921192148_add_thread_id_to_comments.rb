class AddThreadIdToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :thread_id_hash, :string, index: true, primary: true
    add_column :comments, :thread_id, :string, index: true
  end
end
