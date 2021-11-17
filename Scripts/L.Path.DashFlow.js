// @class PolyLine
// // "THE BEER-WARE LICENSE":
// <ivan@sanchezortega.es> wrote this file. As long as you retain this notice you
// can do whatever you want with this stuff. If we meet some day, and you think
// this stuff is worth it, you can buy me a beer in return.

L.Path.mergeOptions({
	// @option dashSpeed: Number
	// The speed of the dash array, in pixels per second
	dashSpeed: 0
});


var _originalBeforeAdd = L.Path.prototype.beforeAdd;

L.Path.include({

	beforeAdd: function (map) {
		_originalBeforeAdd.bind(this)(map);
		
		if (this.options.dashSpeed) {
			this._lastDashFrame = performance.now();
			this._dashFrame = L.Util.requestAnimFrame(this._onDashFrame.bind(this));
		}
	},

	_onDashFrame: function(){
		if (!this._renderer) {
			return;
		}
		
		var now = performance.now();
		var dashOffsetDelta = (now - this._lastDashFrame) * this.options.dashSpeed / 1000;
		
		this.options.dashOffset = Number(this.options.dashOffset || 0) + dashOffsetDelta;
		this._renderer._updateStyle(this);
		
		this._lastDashFrame = performance.now();
		
		this._dashFrame = L.Util.requestAnimFrame(this._onDashFrame.bind(this));
	}
	
});







