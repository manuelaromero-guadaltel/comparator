/*
 * Copyright 2010-2017 interactive instruments GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "toastr"], function($, Backbone, toastr ) {

    var EtfCollection = Backbone.Collection.extend( {

        initialize: function( models, options ) {
            this.deferred = $.Deferred();

            var self = this;
            if(!_.isUndefined(self.collectionDependencies)) {
                $.when.apply($, self.collectionDependencies).then(function() {
                    self.fetch(options);
                });
            }else{
                this.fetch(options);
            }
        },

        fetch: function(options) {
            var self = this;
            console.log("Fetching "+self.collectionName);
            Backbone.Collection.prototype.fetch.call(this, {
                options: options,
                success: function(d) {
                    console.log("Successfully fetched "+self.collectionName);
                    self.trigger("added");
                    self.deferred.resolve(d);
                },
                error: function(response) {
                    toastr["error"]("Could not fetch "+self.collectionName+ "!");
                    console.log(response);
                    self.deferred.reject(response);
                }
            });
            return this.deferred.promise();
        },

        collectObjectsFromIds: function(ids, objects, onFailure) {
            if(_.isNull(ids)) {
                return [];
            }
            var idCollection;
            if(Array.isArray(ids)) {
                idCollection = ids;
            }else{
                idCollection = [ids];
            }
            var _this = this;
            _.each(idCollection, function (id) {
                var obj = _this.get(id.trim());
                if(objects != null) {
                    if( _.isUndefined(obj) ) {
                        toastr.error("Object with ID "+id+" not found in "+this.collectionName);
                        objects = null;
                        onFailure();
                        return;
                    }
                    objects[obj.id]=obj;
                }
            });
        },



    });

    return EtfCollection;

} );
