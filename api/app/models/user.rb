class User < ApplicationRecord
    has_secure_password

    has_many :transactions, dependent: :destroy
    has_many :categories, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "must be a valid email address" }

    def full_name
        "#{first_name} #{last_name}"
    end

    before_save :downcase_email
    before_save :capitalize_names

    private
    
    def downcase_email
        self.email = email.downcase
    end

    def capitalize_names
        self.first_name = first_name.capitalize
        self.last_name = last_name.capitalize
    end

end
