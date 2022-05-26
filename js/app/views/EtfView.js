/*
 * Copyright 2010-2020 interactive instruments GmbH
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
    "etf.webui/v2",
], function( $, Backbone, v2) {

    /**
     *
     * Store page element in page property.
     * Use registerPageHideEvent() function.
     * Only use addListener to register event listeners, which will
     * be removed on 'pagehide'.
     *
     */
    var EtfView = Backbone.View.extend( {

        registerViewEvents: function() {

            _.bindAll();

            var ctx = this;
            this.$el.on("pagehide", function(e) {
                ctx._onHide(e, ctx)
            });
            this.$el.on("pageshow", function(e) {
                ctx._onShow(e, ctx)
            });
        },

        _onHide: function (e, ctx) {
            ctx.onHide(e, ctx);
        },
        onHide: function (e, ctx) {
            // console.log("Hiding %o", ctx);
        },

        _onShow: function(e, ctx) {
            ctx.onShow(e, ctx);
        },
        onShow: function (e, ctx) {
            // console.log("Showing %o", ctx);
        },
    });
    return EtfView;
} );
