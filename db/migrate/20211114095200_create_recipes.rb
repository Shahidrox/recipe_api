class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title, limit: 100, null: false
      t.string :making_time, limit: 100, null: false
      t.string :serves, limit: 100, null: false
      t.string :ingredients, limit: 300, null: false
      t.integer :cost, null: false

      t.timestamps
    end
  end
end
