class CreatePicks < ActiveRecord::Migration[6.1]
  def change
    create_table :picks do |t|
      t.integer :number
      t.string :text
      t.string :outcome
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end

