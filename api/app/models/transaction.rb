class Transaction < ApplicationRecord
    belongs_to :category
    belongs_to :user

    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :date, presence: true
    validates :transaction_type, presence: true
    validates :transaction_type, inclusion: { in: ['expenditure', 'income']  }
end
