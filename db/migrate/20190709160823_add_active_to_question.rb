class AddActiveToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :active, :boolean, default:true
  end
end
