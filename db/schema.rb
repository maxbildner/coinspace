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

ActiveRecord::Schema.define(version: 2019_11_12_184534) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "currencies", force: :cascade do |t|
    t.string "symbol", null: false
    t.string "name", null: false
    t.string "description"
    t.float "high"
    t.float "low"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_currencies_on_name"
    t.index ["symbol"], name: "index_currencies_on_symbol", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "state", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "cash_balance"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "wallet_transactions", force: :cascade do |t|
    t.integer "wallet_id", null: false
    t.float "quantity"
    t.float "price"
    t.string "transaction_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_wallet_transactions_on_user_id"
    t.index ["wallet_id"], name: "index_wallet_transactions_on_wallet_id"
  end

  create_table "wallets", force: :cascade do |t|
    t.string "currency_symbol", null: false
    t.integer "user_id", null: false
    t.string "wallet_address", null: false
    t.float "total_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["currency_symbol"], name: "index_wallets_on_currency_symbol"
    t.index ["total_value"], name: "index_wallets_on_total_value"
    t.index ["user_id"], name: "index_wallets_on_user_id"
    t.index ["wallet_address"], name: "index_wallets_on_wallet_address", unique: true
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "currency_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["currency_id"], name: "index_watchlists_on_currency_id"
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

end
