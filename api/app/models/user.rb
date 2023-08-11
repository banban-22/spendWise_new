class User < ApplicationRecord
    has_secure_password

    has_many :transactions, dependent: :destroy
    has_many :categories, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "must be a valid email address" }, unless: :from_omniauth?

    def full_name
        "#{first_name} #{last_name}"
    end

    before_save :downcase_email
    before_save :capitalize_names

    serialize :twitter_raw_data

    def self.find_from_omniauth(omniauth_data)
        User.where(provider: omniauth_data["provider"],
                   uid:      omniauth_data["uid"]).first
      end

    def self.create_from_omniauth(omniauth_data)
        full_name = omniauth_data["info"]["name"].split
        User.create(uid:                      omniauth_data["uid"],
                provider:                 omniauth_data["provider"],
                first_name:               full_name[0],
                last_name:                "-",
                email:                    omniauth_data["uid"] + "@" + omniauth_data["provider"] + "." + "user",
                oauth_token:              omniauth_data["credentials"]["token"],
                oauth_secret:             omniauth_data["credentials"]["secret"],
                oauth_raw_data:           omniauth_data,
                password:                 SecureRandom.hex(16)
                )
    end

    private
    
    def downcase_email
        self.email = email.downcase
    end

    def capitalize_names
        self.first_name = first_name.capitalize
        self.last_name = last_name.capitalize
    end

    def from_omniauth?
        uid.present? && provider.present?
    end

end
