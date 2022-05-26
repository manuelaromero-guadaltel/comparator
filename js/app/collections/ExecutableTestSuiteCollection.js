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

// Executable Test Suite Collection
// ===================

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "etf.webui/collections/EtfCollection",
    "etf.webui/v2",
    "../models/ExecutableTestSuiteModel" ], function($, Backbone, EtfCollection, v2, ExecutableTestSuiteModel ) {

    var Collection = EtfCollection.extend( {

        url: v2.baseUrl+"/ExecutableTestSuites?fields=label,remoteResource,description,version,author,creationDate,"
        + "lastEditor,lastUpdateDate,tags,translationTemplateBundle,ParameterList,supportedTestObjectTypes,dependencies",
        collectionName: "Executable Test Suites",

        // The Collection constructor
        initialize: function( models, options ) {
            this.tagCollection = options.tagCollection;
            this.testObjectTypeCollection = options.testObjectTypeCollection;
            this.translationTemplateBundleCollection = options.translationTemplateBundleCollection;

            this.collectionDependencies = [options.tagCollection,
                options.testObjectTypeCollection.deferred,
                options.translationTemplateBundleCollection.deferred];
            EtfCollection.prototype.initialize.call(this, models, options);
        },

        parse: function(response) {
            if(_.isUndefined(response.EtfItemCollection.executableTestSuites)) {
                return null;
            }
            return response.EtfItemCollection.executableTestSuites.ExecutableTestSuite;
        },

        comparator: function(a, b) {
            var aJ = a.toJSON(), bJ = b.toJSON();
            var tagsA = aJ.tags, tagsB = bJ.tags;
            var aPrio = 0, bPrio = 0;
            var aLabel = "", bLabel = "";

            if( !_.isNil(tagsA) && tagsA.length != 0) {
                if(!_.isNil(tagsA[0].priority)) {
                    aPrio = parseInt(tagsA[0].priority, 10);
                }
                aLabel += tagsA[0].label;
            }
            if( !_.isNil(tagsB) && tagsB.length != 0) {
                if(!_.isNil(tagsB[0].priority)) {
                    bPrio += parseInt(tagsB[0].priority, 10);
                }
                bLabel += tagsB[0].label;
            }
            if(aPrio > bPrio) {
                return 1;
            }else if(aPrio < bPrio) {
                return -1;
            }else{
                if(aLabel > bLabel) {
                    return 1;
                }else if(aLabel < bLabel) {
                    return -1;
                }else{
                    if(aJ.label > bJ.label) {
                        return 1;
                    }else if(aJ.label < bJ.label) {
                        return -1;
                    }
                }
            }
            console.error("Executable Test Suites have identical labels: %o = %o", a.get("id"), b.get("id"));
            return 0;
        },

        model: ExecutableTestSuiteModel,
    });

    return Collection;

} );
