# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_02_215916) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "crop_polygons", force: :cascade do |t|
    t.geography "area", limit: {:srid=>4326, :type=>"st_polygon", :geographic=>true}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["area"], name: "index_crop_polygons_on_area", using: :gist
  end

  create_table "my_spatial_tables", force: :cascade do |t|
    t.geometry "shape1", limit: {:srid=>0, :type=>"geometry"}
    t.geometry "shape2", limit: {:srid=>0, :type=>"geometry"}
    t.geometry "path", limit: {:srid=>3785, :type=>"line_string"}
    t.geometry "lonlat", limit: {:srid=>3785, :type=>"st_point"}
    t.geometry "testpoly", limit: {:srid=>3785, :type=>"st_polygon"}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
