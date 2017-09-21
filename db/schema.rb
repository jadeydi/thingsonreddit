# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170921195949) do

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.integer "score"
    t.string "name"
    t.string "author"
    t.integer "downs"
    t.integer "ups"
    t.integer "year"
    t.integer "month"
    t.datetime "created_utc"
    t.string "subreddit_id"
    t.integer "controversiality"
    t.string "subreddit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "thread_id_hash"
    t.string "thread_id"
  end

  create_table "things", force: :cascade do |t|
    t.string "original_link"
    t.string "amazon_link"
    t.string "amazon_image"
    t.string "product_title"
    t.integer "score"
    t.integer "year"
    t.integer "month"
    t.datetime "created_utc"
    t.string "subreddit_id"
    t.string "subreddit"
    t.datetime "updated_at", null: false
    t.string "comment_id"
    t.index ["amazon_link", "comment_id"], name: "index_things_on_amazon_link_and_comment_id", unique: true
    t.index ["score"], name: "index_things_on_score"
    t.index ["subreddit"], name: "index_things_on_subreddit"
  end

end
