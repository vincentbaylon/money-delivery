class CardSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :start, :end, :week
end
