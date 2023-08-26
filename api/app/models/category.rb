class Category < ApplicationRecord
    has_many :transactions
    belongs_to :user

    validates :name, presence: true

    before_save {
        self.name = name.capitalize
    }
end