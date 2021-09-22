class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :wins, :losses, :pushes
  has_many :picks
end
