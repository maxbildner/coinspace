# == Schema Information
#
# Table name: watchlists
#
#  id          :bigint           not null, primary key
#  currency_id :integer          not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Watchlist < ApplicationRecord 
  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :currency,
    foreign_key: :currency_id,
    class_name: :Currency


end
