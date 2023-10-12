class Category < ApplicationRecord
    has_many :transactions
    belongs_to :user

    validates :name, presence: true

    def as_json(options = {})
        super(options.merge({ except: [:created_at, :updated_at] }))
    end

    # before_save {
    #     self.name = name.capitalize
    # }
end