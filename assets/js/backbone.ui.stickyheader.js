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

		el: ".ui-sticky-header",

		options : {
			itemEl: ".item header",
			offset: 0
		},

		events: {
		},

		initialize: function(options){
			var self = this;

			_.bindAll(this, '_stickyHeaderLoad', '_stickyHeaderScroll');

			//
			this.options = _.extend({}, this.options, options);

			this._stickyHeaderLoad();
			// event
			$(window).on("scroll", function() {

				self._stickyHeaderScroll();

			});

			// continue...
			return View.prototype.initialize.call(this, options);

		},

		// internal methods

		_stickyHeaderLoad: function() {

			var offset = this.options.offset;

			var items = [];

			var $items = $(this.el).find( this.options.itemEl );

			// look up items (use data model instead?)
			$items.each(function(){
				var item = {};
				// wrap header
				var $el = $(this).wrap('<div class="ui-sticky-header-wrapper" />');
				var height = $el.outerHeight();
				$el.parent().height( height );

				// record position
				var pos = $el.offset().top - offset; // normalize position (including offset)

				items.push({ $el: $el, pos: pos, height: height }); // calculate these only once...
			});

			// save for later
			this._stickyHeaderItems = items;
		},

		_stickyHeaderScroll: function() {

			var items = this._stickyHeaderItems;
			var offset = this.options.offset;
			var scrollTop = $(window).scrollTop();
			var winHeight = $(window).height();

			for( var i in items ){

				var $el = items[i].$el,
					normalPos = items[i].pos; // original position

				// don't process if (normally) off screen
				/*
				if( normalPos > scrollTop + winHeight || normalPos < scrollTop ){
					// reset element (do it only once)
					if( $el.hasClass("fixed") ) $el.removeClass("fixed").removeClass("absolute").css({ top: "auto" });
					continue;
				}
				*/
				// for visible elements...
				var next = items[ parseInt(i)+1 ],
					prev = items[ parseInt(i)-1 ],
					height = items[i].height,
					pos = $el.offset().top; // current position


				// in case it's just about to slide out...
				if( normalPos <= scrollTop ){

					$el.addClass("fixed");
					$el.css({ top: offset+"px" });

					// position the element above the next element
					if ( next && pos >= next.pos - height ) {

						$el.addClass("absolute").css("top", next.pos - height + offset );

					}

				} else {
					// this is onscreeen but still under the previous header..
					if( $el.hasClass("fixed") ){
						$el.removeClass("fixed");
						$el.css({ top: "auto" });
					}
					// reset previous element if approaching the edge
					if ( prev && scrollTop <= normalPos - prev.height ) {

						prev.$el.removeClass("absolute");
						//
						if( prev.$el.hasClass("fixed") ){
							prev.$el.css({ top: offset+"px" });
						} else {
							prev.$el.css({ "top": "auto" });
						}

					}

				}
			}
		}

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
