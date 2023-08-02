class Ability
  include CanCan::Ability

  def initialize(user)
    user = user || User.new

    can :create, Transaction, user_id: user.id
    can :edit, Transaction, user_id: user.id
    can :update, Transaction, user_id: user.id
    can :destroy, Transaction, user_id: user.id
    can :create, Category, user_id: user.id
    can :edit, Category, user_id: user.id
    can :destroy, Category, user_id: user.id
  end
end
