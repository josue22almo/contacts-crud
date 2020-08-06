class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts, id: false do |t|
      t.string :firstName, null: false
      t.string :lastName, null: false
      t.string :email, null: false
      t.string :phoneNumber, null: false

      t.timestamps
    end

    add_index :contacts, :email, unique: true

  end
end
