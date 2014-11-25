// Generated by CoffeeScript 1.7.1
var Scope;

Scope = (function() {
  var $;

  $ = window["jQuery"];

  function Scope(scopeId, shell, balloon) {
    var $style;
    this.scopeId = scopeId;
    this.shell = shell;
    this.balloon = balloon;
    this.$scope = $("<div />").addClass("scope");
    $style = $("<style scoped />").html(this.style);
    this.$surface = $("<div />").addClass("surface");
    this.$surfaceCanvas = $("<canvas />").addClass("surfaceCanvas");
    this.$blimp = $("<div />").addClass("blimp");
    this.$blimpCanvas = $("<canvas width='0' height='0' />").addClass("blimpCanvas");
    this.$blimpText = $("<div />").addClass("blimpText");
    this.$surface.append(this.$surfaceCanvas);
    this.$blimp.append(this.$blimpCanvas);
    this.$blimp.append(this.$blimpText);
    this.$scope.append($style);
    this.$scope.append(this.$surface);
    this.$scope.append(this.$blimp);
    this.element = this.$scope[0];
    this.destructors = [];
    this.currentSurface = null;
    this.currentBalloon = null;
    this.isBalloonLeft = true;
    this.talkInsertPointStack = [this.$blimpText];
    this.insertPoint = this.$blimpText;
    this.$scope.css({
      "bottom": "0px",
      "right": (this.scopeId * 240) + "px"
    });
  }

  Scope.prototype.surface = function(surfaceId, callback) {
    var type;
    if (callback == null) {
      callback = function() {};
    }
    type = this.scopeId === 0 ? "sakura" : "kero";
    if (surfaceId != null) {
      if (surfaceId === -1) {
        this.$surface.css({
          "visibility": "hidden"
        });
      } else {
        this.$surface.css({
          "visibility": "visible"
        });
      }
      if (!!this.currentSurface) {
        this.currentSurface.destructor();
      }
      this.currentSurface = this.shell.attachSurface(this.$surfaceCanvas[0], this.scopeId, surfaceId, callback);
      this.$scope.width(this.$surfaceCanvas.width());
      this.$scope.height(this.$surfaceCanvas.height());
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
        if (this.isBalloonLeft) {
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
        if (this.$blimp.offset().top - this.$blimp.position().top >= $(window).height()) {
          this.$blimp.css({
            "top": -$(this.$blimpCanvas).height()
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
      anchorBegin: (function(_this) {
        return function(id) {
          var _id;
          _id = $(document.createElement("div")).text(id).html();
          _this.insertPoint = $("<a />").addClass("ikagaka-anchor").attr({
            "data-anchorid": _id
          }).appendTo(_this.$blimpText);
          return void 0;
        };
      })(this),
      anchorEnd: (function(_this) {
        return function() {
          _this.insertPoint = _this.$blimpText;
          return void 0;
        };
      })(this),
      choice: (function(_this) {
        return function(text, id) {
          var _id, _text;
          _text = $(document.createElement("div")).text(text).html();
          _id = $(document.createElement("div")).text(id).html();
          $("<a />").addClass("ikagaka-choice").attr({
            "data-choiceid": _id
          }).html(_text).appendTo(_this.insertPoint);
          return void 0;
        };
      })(this),
      talk: (function(_this) {
        return function(text) {
          var _text;
          _text = $(document.createElement("div")).text(text).html();
          if (!!_this.currentSurface) {
            _this.currentSurface.talk();
          }
          _this.$blimp.show();
          _this.insertPoint.html(_this.insertPoint.html() + _text);
          _this.$blimpText[0].scrollTop = 999;
          return void 0;
        };
      })(this),
      clear: (function(_this) {
        return function() {
          _this.insertPoint = _this.$blimpText;
          _this.$blimpText.html("");
          return void 0;
        };
      })(this),
      br: (function(_this) {
        return function() {
          _this.insertPoint.html(_this.insertPoint.html() + "<br />");
          return void 0;
        };
      })(this)
    };
  };

  Scope.prototype.style = ".scope {\n  position: absolute;\n  pointer-events: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.surface {}\n.surfaceCanvas {\n  pointer-events: auto;\n}\n.blimp {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  pointer-events: auto;\n}\n.blimpCanvas {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.blimpText {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  overflow-y: scroll;\n  white-space: pre;\n  white-space: pre-wrap;\n  white-space: pre-line;\n  word-wrap: break-word;\n}\n.blimpText a {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.blimpText a:hover { background-color: yellow; }\n.blimpText a.ikagaka-choice { color: blue; }\n.blimpText a.ikagaka-anchor { color: red; }";

  return Scope;

})();

if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
  module.exports = Scope;
}

if (window["Ikagaka"] != null) {
  window["Ikagaka"]["Scope"] = Scope;
}
