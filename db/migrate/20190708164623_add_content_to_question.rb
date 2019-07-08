class AddContentToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :content, :string
  end
end
