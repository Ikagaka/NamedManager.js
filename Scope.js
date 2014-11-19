// Generated by CoffeeScript 1.7.1
var Scope;

Scope = (function() {
  var $;

  $ = window["jQuery"];

  function Scope(scopeId, shell, balloon) {
    var $blimpStyle, $scopeStyle;
    this.scopeId = scopeId;
    this.shell = shell;
    this.balloon = balloon;
    this.$scope = $("<div />").addClass("scope").css({
      "position": "absolute",
      "bottom": "0px",
      "right": (this.scopeId * 240) + "px"
    }).draggable({});
    $scopeStyle = $("<style scoped />").html(".scope {\n  display: inline-block;\n  position: absolute;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  tap-highlight-color: transparent;\n}\n.surfaceCanvas {\n  display: inline-block;\n}");
    this.$surfaceCanvas = $("<canvas />").addClass("surfaceCanvas");
    this.$surface = $("<div />").addClass("surface").append(this.$surfaceCanvas);
    this.$blimpCanvas = $("<canvas width='0' height='0' />").addClass("blimpCanvas");
    $blimpStyle = $("<style scoped />").html(".blimp {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.blimpCanvas {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.blimpText {\n  display: inline-block;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  overflow-y: scroll;\n  white-space: pre;\n  white-space: pre-wrap;\n  white-space: pre-line;\n  word-wrap: break-word;\n  /*pointer-events: none;*/\n}\n.blimpText a {\n  text-decoration: underline;\n}\n.blimpText .ikagaka-choice {\n  color: blue;\n  cursor: pointer;\n}\n.blimpText .ikagaka-choice:hover{\n  background-color: yellow;\n}");
    this.$blimpText = $("<div />").addClass("blimpText");
    this.$blimp = $("<div />").addClass("blimp").append($blimpStyle).append(this.$blimpCanvas).append(this.$blimpText).css({
      "position": "absolute"
    }).draggable();
    this.$scope.append($scopeStyle).append(this.$surface).append(this.$blimp).delegate(".ikagaka-choice", "click", (function(_this) {
      return function(ev) {
        var detail;
        detail = {
          "ID": "OnChoiceSelect",
          "Reference0": ev.target.dataset["choiceid"]
        };
        return _this.$scope.trigger($.Event("IkagakaSurfaceEvent", {
          detail: detail
        }));
      };
    })(this));
    this.element = this.$scope[0];
    this.currentSurface = null;
    this.currentBalloon = null;
    this.leftFlag = true;

    /*
    @$blimp.on "click", (ev)=>
      @leftFlag = !@leftFlag
      if @leftFlag
      then @blimp(0)
      else @blimp(1)
     */
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
      choice: (function(_this) {
        return function(text, id) {
          $("<a />").addClass("ikagaka-choice").attr({
            "data-choiceid": id
          }).html(text).appendTo(_this.$blimpText);
          return void 0;
        };
      })(this),
      talk: (function(_this) {
        return function(txt) {
          if (!!_this.currentSurface) {
            _this.currentSurface.talk();
          }
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
