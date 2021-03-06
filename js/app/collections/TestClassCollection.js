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

// Test Class Collection
// ===================

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "etf.webui/collections/EtfCollection",
    "etf.webui/v2",
    "../models/TestClassModel" ], function($, Backbone, EtfCollection, v2, TestClassModel ) {

    var Collection = EtfCollection.extend( {

        url: v2.baseUrl+"/TestRunTemplates?fields=*",
        collectionName: "Test Classes",

        // The Collection constructor
        initialize: function( models, options ) {
            this.testObjectTypeCollection = options.testObjectTypeCollection;
            this.translationTemplateBundleCollection = options.translationTemplateBundleCollection;

            this.collectionDependencies = [
                options.testObjectTypeCollection.deferred,
                options.translationTemplateBundleCollection.deferred];
            EtfCollection.prototype.initialize.call(this, models, options);
        },

        parse: function(response) {
            if(_.isUndefined(response.EtfItemCollection.testRunTemplates)) {
                return null;
            }
            return response.EtfItemCollection.testRunTemplates.TestRunTemplate;
        },

        model: TestClassModel,
    });

    return Collection;

} );
