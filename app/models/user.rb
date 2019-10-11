# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  state           :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  cash_balance    :float
#

class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, :first_name, :last_name, :state, presence: true
    validates :password, length: { minimum: 8, allow_nil: true }

    attr_reader :password

    after_initialize :ensure_session_token

    has_many :wallets,
        foreign_key: :user_id,
        class_name: :Wallet

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        save!
        session_token
    end

    private

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def create_wallets 
        # supported_currencies = ['BTC', 'BCH', 'ETH', 'LTC', 'XRP', 'ETC', 'DAI']
        # supported_currencies.each do |currency|
        #     curr = Wallet.new()
        # end
    end
end
