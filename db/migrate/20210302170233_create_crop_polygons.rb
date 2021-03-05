class CreateCropPolygons < ActiveRecord::Migration[6.1]
  def change
    create_table :crop_polygons do |t|
      t.st_polygon :area, srid: 3785

      t.timestamps
      add_index :crop_polygons, :area, using: :gist
    end
  end
end
