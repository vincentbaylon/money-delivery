class Card < ApplicationRecord
  has_many :picks, dependent: :destroy
end
