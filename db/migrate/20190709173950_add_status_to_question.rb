class AddStatusToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :status, :string
  end
end
