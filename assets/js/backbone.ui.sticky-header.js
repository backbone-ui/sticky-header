/* Backbone UI: StickyHeader
 * Source: https://github.com/backbone-ui/sticky-header
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(window, $, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var StickyHeader = View.extend({

		el: "", 

		options : {
			
		},

		events: {
			// "click"  : "someFunction"
		},

		initialize: function(options){
			// $(this.el).appendTo('body');

			_.bindAll(this, 'render');

			// continue...
			return View.prototype.initialize.call(this, options);

		},
		
		someFunction: function() {
			
		},
	});


	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = StickyHeader;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define("backbone.ui.StickyHeader", ['jquery''underscore', 'backbone'], function(){ return StickyHeader; });
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.UI = APP.UI || {};
			APP.UI.StickyHeader = StickyHeader;
			// save namespace
			window.APP = APP;
		}
		// update Backbone namespace regardless
		Backbone.UI = Backbone.UI || {};
		Backbone.UI.StickyHeader = StickyHeader;
		window.Backbone = Backbone;
	}



})(this.window, this.$, this._, this.Backbone, this.APP);
