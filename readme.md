# Backbone UI: Sticky Header

A simple extension to create an Instagram style sticky header.

## Examples

* [Static](http://rawgit.com/backbone-ui/sticky-header/master/examples/static.html) 


## Features

* Flexible markup structure


## Dependencies

* [Backbone](http://backbonejs.org/)
* [jQuery](http://jquery.com/)


## Install

Using bower:
```
bower install backbone.ui.sticky-header
```


## Usage

Load the css and js in your app. Then load the view on the appropriete container:
```
var view = new Backbone.UI.StickyHeader({
	el : '.ui-sticky-header'
});
```

## Options 

* ***itemEl*** (default: ".item header") the DOM selector for the header elements
* ***offset*** (default: 0) The offset for calculating the effect. Used when there is visible content above the collection. 


## Credits

Initiated by Lyndel Thomas ( [@ryndel](http://github.com/ryndel) )

Inspired by Instagram and the Codepen, ( [Multiple Stickies](http://codepen.io/usain/pen/krfwt) ), by Dylan Scott 

Distributed through [Makesites.org](http://makesites.org/)


## License

Released under the [MIT license](http://makesites.org/licenses/MIT)

