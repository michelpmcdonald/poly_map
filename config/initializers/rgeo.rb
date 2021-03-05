RGeo::ActiveRecord::SpatialFactoryStore.instance.tap do |config|
    # By default, use the GEOS implementation for spatial columns.
    config.default = RGeo::Geos.factory_generator
  end