require 'rgeo/geo_json'

module Api
    module V1    
        class CropPolygonsController < ApplicationController
            protect_from_forgery with: :null_session
            
            def index
                # Create a default factory to interact with RGeo API
                factory = RGeo::GeoJSON::EntityFactory.instance
                
                # Grab all the user defined stored Crop Polygons
                @cropPolys = CropPolygon.all
                
                # iterate over the crop polygons activerecords, convet to GeoJson feature, push into features collection
                features = Array.new
                for poly in @cropPolys
                    features.push(factory.feature(poly.area, nil))
                end
                
                # Generate a GeoJson Featurecollection and return
                render json: RGeo::GeoJSON.encode(factory.feature_collection(features))
                
            end

            def create
                # Create a default factory to interact with RGeo API
                factory = RGeo::GeoJSON::EntityFactory.instance

                #cp = RGeo::GeoJSON.decode(params['geometry'])
                #logger.debug(params['geometry'])
                #testff = {"coordinates"=>[[[-105.29970124606258, 40.016581089803964], [-105.2971477830806, 40.01649892206339], [-105.29944375399711, 40.01534856330463], [-105.29970124606258, 40.016581089803964]]], "type"=>"Polygon"}
                testff = params["geometry"].to_unsafe_hash
                logger.debug("Type:")
                logger.debug(testff.class.name)
                logger.debug("")

                cp = RGeo::GeoJSON.decode(testff)
                newPoly = CropPolygon.new
                newPoly.area = cp
                newPoly.save
                render json: {}, :status => :ok
            end
        
        end
    end
end