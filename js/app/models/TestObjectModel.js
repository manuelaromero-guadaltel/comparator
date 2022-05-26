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

// Test Object Model
// ==============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "etf.webui/v2",
], function( $, Backbone, v2 ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

        idAttribute: 'id',

        initialize: function( attr, options ) {
            this.testObjectTypeCollection = options.collection.testObjectTypeCollection;
        },

        toJSON: function() {
            var testObjectTypeCollection = this.testObjectTypeCollection;
            var attributes = _.clone(this.attributes);
            $.each(attributes, function(key, value) {
                switch (key) {
                    case 'testObjectTypes':
                        attributes[key] = v2.resolveRefs(value.testObjectType, testObjectTypeCollection);
                        break;
                    default:
                        if(value && _(value.toJSON).isFunction()) {
                            attributes[key] = value.toJSON();
                        }
                }
            });
            return attributes;
        },

        getTestObjectTypes: function() {
            var map = {};
            var testObjectTypes = this.get('testObjectTypes');
            if(!_.isUndefined(testObjectTypes)) {
                var types = v2.resolveRefs(testObjectTypes.testObjectType, this.testObjectTypeCollection);
                _.each(types, function(t) {
                    map[t.id] = t;
                    var p = t.parent;
                    while(!_.isUndefined(p)) {
                        map[p.id] = p;
                        p = p.parent;
                    }
                });
            }
            return map;
        },

    } );


    // Returns the Model class
    return Model;

} );
