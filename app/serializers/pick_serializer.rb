class PickSerializer < ActiveModel::Serializer
  attributes :id, :number, :text, :user_id, :outcome
  belongs_to :user
end
