class CreateMySpatialTables < ActiveRecord::Migration[6.1]
  def change
    create_table :my_spatial_tables do |t|
      t.column :shape1, :geometry
      t.geometry :shape2
      t.line_string :path, srid: 3785
      t.st_point :lonlat, srid: 3785
      t.st_polygon :testpoly, srid: 3785
      t.timestamps
    end
  end
end
