class Thing < ApplicationRecord
  self.per_page = 10
  belongs_to :comment, primary_key: 'thread_id_hash', foreign_key: 'comment_id'
end
