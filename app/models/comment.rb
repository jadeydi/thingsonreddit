class Comment < ApplicationRecord
  has_many :things, primary_key: 'thread_id_hash'
  self.primary_key = 'thread_id_hash'
end
