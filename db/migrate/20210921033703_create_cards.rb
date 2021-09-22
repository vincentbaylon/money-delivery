class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :image_url
      t.integer :start
      t.integer :end
      t.integer :week

      t.timestamps
    end
  end
end
