class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :amount, :description, :date, :currency, :category_id, :user_id

  belongs_to :user, key: :user
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :full_name
  end

  has_many :categories, key: :categories
  class CategorySerializer < ActiveModel::Serializer
    attributes :id, :name, :user
  end
end
