// Generated by CoffeeScript 1.7.1
var Scope;

Scope = (function() {
  var $;

  $ = window["Zepto"];

  function Scope(scopeId, shell, balloon) {
    this.scopeId = scopeId;
    this.shell = shell;
    this.balloon = balloon;
    this.$scope = $("<div />").addClass("scope").css({
      "bottom": "0px",
      "right": (this.scopeId * 240) + "px"
    });
    this.$style = $("<style scoped />").html(".scope {\n  display: inline-block;\n  position: absolute;\n  /*-webkit-user-select: none;*/\n  /*-webkit-tap-highlight-color: transparent;*/\n}\n.surfaceCanvas {\n  display: inline-block;\n}");
    this.$surfaceCanvas = $("<canvas />").addClass("surfaceCanvas");
    this.$surface = $("<div />").addClass("surface").append(this.$surfaceCanvas).hide();
    this.$blimpCanvas = $("<canvas width='0' height='0' />").addClass("blimpCanvas");
    this.$blimpStyle = $("<style scoped />").html(".blimp {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.blimpCanvas {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.blimpText {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  overflow-y: scroll;\n  white-space: pre;\n  white-space: pre-wrap;\n  white-space: pre-line;\n  word-wrap: break-word;\n  /*pointer-events: none;*/\n}");
    this.$blimpText = $("<div />").addClass("blimpText");
    this.$blimp = $("<div />").addClass("blimp").append(this.$blimpStyle).append(this.$blimpCanvas).append(this.$blimpText).hide();
    this.$scope.append(this.$surface).append(this.$blimp).append(this.$style);
    this.element = this.$scope[0];
    this.currentSurface = null;
    this.currentBalloon = null;
    this.leftFlag = true;
    this.$blimp.on("click", (function(_this) {
      return function(ev) {
        _this.leftFlag = !_this.leftFlag;
        if (_this.leftFlag) {
          return _this.blimp(0);
        } else {
          return _this.blimp(1);
        }
      };
    })(this));
  }

  Scope.prototype.surface = function(surfaceId, callback) {
    var type;
    if (callback == null) {
      callback = function() {};
    }
    type = this.scopeId === 0 ? "sakura" : "kero";
    if (surfaceId != null) {
      if (surfaceId === -1) {
        this.$surface.hide();
      } else {
        this.$surface.show();
      }
      if (!!this.currentSurface) {
        this.currentSurface.destructor();
      }
      this.currentSurface = this.shell.attachSurface(this.$surfaceCanvas[0], this.scopeId, surfaceId);
    }
    return this.currentSurface;
  };

  Scope.prototype.blimp = function(balloonId, callback) {
    var b, descript, h, l, r, t, type, w;
    if (callback == null) {
      callback = function() {};
    }
    type = this.scopeId === 0 ? "sakura" : "kero";
    if (balloonId != null) {
      if (balloonId === -1) {
        this.$blimp.hide();
      } else {
        this.$blimp.show();
      }
      if (!!this.currentBalloon) {
        this.currentBalloon.destructor();
      }
      this.currentBalloon = this.balloon.attachSurface(this.$blimpCanvas[0], this.scopeId, balloonId);
      if (!!this.currentBalloon) {
        descript = this.currentBalloon.descript;
        this.$blimp.css({
          "width": this.$blimpCanvas.width(),
          "height": this.$blimpCanvas.height()
        });
        if (this.leftFlag) {
          this.$blimp.css({
            "top": Number(this.shell.descript["" + type + ".balloon.offsety"] || 0),
            "left": Number(this.shell.descript["" + type + ".balloon.offsetx"] || 0) + -1 * this.$blimpCanvas.width()
          });
        } else {
          this.$blimp.css({
            "top": Number(this.shell.descript["" + type + ".balloon.offsety"] || 0),
            "left": Number(this.shell.descript["" + type + ".balloon.offsetx"] || 0) + this.$surfaceCanvas.width()
          });
        }
        t = descript["origin.y"] || descript["validrect.top"] || "10";
        r = descript["validrect.right"] || "10";
        b = descript["validrect.bottom"] || "10";
        l = descript["origin.x"] || descript["validrect.left"] || "10";
        w = this.$blimpCanvas.width();
        h = this.$blimpCanvas.height();
        this.$blimpText.css({
          "top": "" + t + "px",
          "left": "" + l + "px",
          "width": "" + (w - (Number(l) + Number(r))) + "px",
          "height": "" + (h - (Number(t) - Number(b))) + "px"
        });
      }
    }
    return {
      talk: (function(_this) {
        return function(txt) {
          _this.$blimp.show();
          _this.$blimpText.html(_this.$blimpText.html() + txt);
          _this.$blimpText[0].scrollTop = 999;
          return void 0;
        };
      })(this),
      clear: (function(_this) {
        return function(txt) {
          _this.$blimpText.html("");
          return void 0;
        };
      })(this),
      br: (function(_this) {
        return function() {
          _this.$blimpText.html(_this.$blimpText.html() + "<br />");
          return void 0;
        };
      })(this)
    };
  };

  return Scope;

})();
