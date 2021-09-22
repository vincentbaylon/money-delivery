# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_21_050310) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "image_url"
    t.integer "start"
    t.integer "end"
    t.integer "week"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "picks", force: :cascade do |t|
    t.integer "number"
    t.string "text"
    t.string "outcome"
    t.bigint "user_id", null: false
    t.bigint "card_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id"], name: "index_picks_on_card_id"
    t.index ["user_id"], name: "index_picks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.integer "wins", default: 0
    t.integer "losses", default: 0
    t.integer "pushes", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "picks", "cards"
  add_foreign_key "picks", "users"
end
