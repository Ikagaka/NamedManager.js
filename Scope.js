// Generated by CoffeeScript 1.8.0
(function() {
  var $, Scope,
    __slice = [].slice;

  $ = window["Zepto"];

  Scope = (function() {
    function Scope(scopeId, shell, balloon) {
      var clickable_element_style, descript, getfontcolor, styles;
      this.scopeId = scopeId;
      this.shell = shell;
      this.balloon = balloon;
      this.$scope = $("<div />").addClass("scope");
      this.$surface = $("<div />").addClass("surface");
      this.$surfaceCanvas = $("<canvas width='10' height='100' />").addClass("surfaceCanvas");
      this.$blimp = $("<div />").addClass("blimp");
      this.$blimpCanvas = $("<canvas width='0' height='0' />").addClass("blimpCanvas");
      this.$blimpText = $("<div />").addClass("blimpText");
      descript = this.balloon.descript;
      styles = {};
      styles["cursor"] = descript["cursor"] || '';
      styles["font.name"] = (descript["font.name"] || "MS Gothic").split(/,/).map(function(name) {
        return '"' + name + '"';
      }).join(',');
      styles["font.height"] = descript["font.height"] || "12";
      getfontcolor = function(r, g, b, can_ignore) {
        if (can_ignore && (isNaN(r) || r < 0) && (isNaN(g) || g < 0) && (isNaN(b) || b < 0)) {

        } else {
          return ("000000" + ((r > 0 ? r : 0) * 65536 + (g > 0 ? g : 0) * 256 + (b > 0 ? b : 0) * 1).toString(16)).slice(-6);
        }
      };
      styles["font.color"] = getfontcolor(descript["font.color.r"], descript["font.color.g"], descript["font.color.b"]);
      styles["font.shadowcolor"] = getfontcolor(descript["font.shadowcolor.r"], descript["font.shadowcolor.g"], descript["font.shadowcolor.b"], true);
      styles["font.bold"] = descript["font.bold"];
      styles["font.italic"] = descript["font.italic"];
      styles["font.strike"] = descript["font.strike"];
      styles["font.underline"] = descript["font.underline"];
      this._text_style = styles;
      clickable_element_style = function(prefix, style_default) {
        styles = {};
        styles["style"] = {
          square: true,
          underline: true,
          'square+underline': true,
          none: true
        }[descript["" + prefix + ".style"]] ? descript["" + prefix + ".style"] : style_default;
        styles["font.color"] = getfontcolor(descript["" + prefix + ".font.color.r"], descript["" + prefix + ".font.color.g"], descript["" + prefix + ".font.color.b"]);
        styles["pen.color"] = getfontcolor(descript["" + prefix + ".pen.color.r"], descript["" + prefix + ".pen.color.g"], descript["" + prefix + ".pen.color.b"]);
        styles["brush.color"] = getfontcolor(descript["" + prefix + ".brush.color.r"], descript["" + prefix + ".brush.color.g"], descript["" + prefix + ".brush.color.b"]);
        return styles;
      };
      this._choice_style = clickable_element_style("cursor", "square");
      this._anchor_style = clickable_element_style("anchor", "underline");
      this.$blimpText.css(this._blimpTextCSS(this._text_style));
      this._initializeCurrentStyle();
      this.element = this.$scope[0];
      this.destructors = [];
      this.currentSurface = this.shell.attachSurface(this.$surfaceCanvas[0], this.scopeId, 0);
      this.currentBalloon = this.balloon.attachSurface(this.$blimpCanvas[0], this.scopeId, 0);
      this.isBalloonLeft = true;
      this.insertPoint = this.$blimpText;
      this.$blimp.append(this.$blimpCanvas);
      this.$blimp.append(this.$blimpText);
      this.$surface.append(this.$surfaceCanvas);
      this.$scope.append(this.$surface);
      this.$scope.append(this.$blimp);
      this.$scope.css({
        "bottom": "0px",
        "right": (this.scopeId * 240) + "px"
      });
      this.surface(0);
      this.blimp(0);
      this.surface(-1);
      this.blimp(-1);
    }

    Scope.prototype.surface = function(surfaceId) {
      var prevSrfId, tmp, type;
      type = this.scopeId === 0 ? "sakura" : "kero";
      if (Number(surfaceId) < 0) {
        this.$surface.hide();
        return this.currentSurface;
      }
      if (surfaceId != null) {
        prevSrfId = this.currentSurface.surfaces.surfaces[this.currentSurface.surfaceName].is;
        this.currentSurface.destructor();
        tmp = this.shell.attachSurface(this.$surfaceCanvas[0], this.scopeId, surfaceId);
        if (!tmp) {
          tmp = this.shell.attachSurface(this.$surfaceCanvas[0], this.scopeId, prevSrfId);
        }
        this.currentSurface = tmp;
        this.$scope.width(this.$surfaceCanvas[0].width);
        this.$scope.height(this.$surfaceCanvas[0].height);
        this.$surface.show();
      }
      return this.currentSurface;
    };

    Scope.prototype.blimp = function(balloonId) {
      var b, descript, h, l, r, t, tmp, type, w;
      if (Number(balloonId) < 0) {
        this.$blimp.hide();
      } else {
        if (balloonId != null) {
          this.currentBalloon.destructor();
          tmp = this.balloon.attachSurface(this.$blimpCanvas[0], this.scopeId, balloonId);
          this.currentBalloon = tmp;
          this.$blimp.width(this.$blimpCanvas[0].width);
          this.$blimp.height(this.$blimpCanvas[0].height);
          this.$blimp.show();
          descript = this.currentBalloon.descript;
          type = this.scopeId === 0 ? "sakura" : "kero";
          this.$blimp.css({
            "top": Number(this.shell.descript["" + type + ".balloon.offsety"] || 0)
          });
          if (this.isBalloonLeft) {
            this.$blimp.css({
              "left": Number(this.shell.descript["" + type + ".balloon.offsetx"] || 0) + -1 * this.$blimpCanvas[0].width
            });
          } else {
            this.$blimp.css({
              "left": Number(this.shell.descript["" + type + ".balloon.offsetx"] || 0) + this.$surfaceCanvas[0].width
            });
          }
          t = descript["origin.y"] || descript["validrect.top"] || "10";
          r = descript["validrect.right"] || "10";
          b = descript["validrect.bottom"] || "10";
          l = descript["origin.x"] || descript["validrect.left"] || "10";
          w = this.$blimpCanvas[0].width;
          h = this.$blimpCanvas[0].height;
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
          return function() {
            var $a, args, argv, id, index, _i, _id, _len;
            id = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            _this.$blimpText.find(".blink").hide();
            _this.$blimp.show();
            _id = $(document.createElement("div")).text(id).html();
            $a = $("<a />");
            $a.addClass("ikagaka-anchor");
            $a.css(_this._blimpTextCSS(_this._current_text_style)).css(_this._blimpClickableTextCSS(_this._current_anchor_style).base);
            $a.mouseover(function() {
              return $a.css(_this._blimpClickableTextCSS(_this._current_anchor_style).over);
            });
            $a.mouseout(function() {
              return $a.css(_this._blimpTextCSS(_this._current_text_style)).css(_this._blimpClickableTextCSS(_this._current_anchor_style).base);
            });
            $a.attr("data-id", _id);
            $a.attr("data-argc", args.length);
            for (index = _i = 0, _len = args.length; _i < _len; index = ++_i) {
              argv = args[index];
              $a.attr("data-argv" + index, argv);
            }
            _this.originalInsertPoint = _this.insertPoint;
            _this.insertPoint = $a.appendTo(_this.insertPoint);
          };
        })(this),
        anchorEnd: (function(_this) {
          return function() {
            _this.insertPoint = _this.originalInsertPoint;
          };
        })(this),
        choice: (function(_this) {
          return function() {
            var $a, args, argv, id, index, text, _i, _id, _len, _text;
            text = arguments[0], id = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
            _this.$blimpText.find(".blink").hide();
            _this.$blimp.show();
            _text = $(document.createElement("div")).text(text).html();
            _id = $(document.createElement("div")).text(id).html();
            $a = $("<a />");
            $a.addClass("ikagaka-choice");
            $a.css(_this._blimpTextCSS(_this._current_text_style));
            $a.mouseover(function() {
              return $a.css(_this._blimpClickableTextCSS(_this._current_choice_style).base).css(_this._blimpClickableTextCSS(_this._current_choice_style).over);
            });
            $a.mouseout(function() {
              return $a.css(_this._blimpTextCSS(_this._current_text_style));
            });
            $a.html(_text);
            $a.attr("data-id", _id);
            $a.attr("data-argc", args.length);
            for (index = _i = 0, _len = args.length; _i < _len; index = ++_i) {
              argv = args[index];
              $a.attr("data-argv" + index, argv);
            }
            $a.appendTo(_this.insertPoint);
          };
        })(this),
        choiceBegin: (function(_this) {
          return function() {
            var $a, args, argv, id, index, _i, _id, _len;
            id = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            _this.$blimpText.find(".blink").hide();
            _this.$blimp.show();
            _id = $(document.createElement("div")).text(id).html();
            $a = $("<a />");
            $a.addClass("ikagaka-choice");
            $a.css(_this._blimpTextCSS(_this._current_text_style));
            $a.mouseover(function() {
              return $a.css(_this._blimpClickableTextCSS(_this._current_choice_style).base).css(_this._blimpClickableTextCSS(_this._current_choice_style).over);
            });
            $a.mouseout(function() {
              return $a.css(_this._blimpTextCSS(_this._current_text_style));
            });
            $a.attr("data-id", _id);
            $a.attr("data-argc", args.length);
            for (index = _i = 0, _len = args.length; _i < _len; index = ++_i) {
              argv = args[index];
              $a.attr("data-argv" + index, argv);
            }
            _this.originalInsertPoint = _this.insertPoint;
            _this.insertPoint = $a.appendTo(_this.insertPoint);
          };
        })(this),
        choiceEnd: (function(_this) {
          return function() {
            _this.insertPoint = _this.originalInsertPoint;
          };
        })(this),
        talk: (function(_this) {
          return function(text) {
            var _text;
            _this.$blimpText.find(".blink").hide();
            _text = $(document.createElement("div")).text(text).html();
            if (!!_this.currentSurface) {
              _this.currentSurface.talk();
            }
            _this.$blimp.show();
            _this.insertPoint.append(_text);
            _this.$blimpText[0].scrollTop = 999;
          };
        })(this),
        marker: (function(_this) {
          return function() {
            var _text;
            _this.$blimpText.find(".blink").hide();
            _text = $(document.createElement("div")).text("・").html();
            _this.$blimp.show();
            _this.insertPoint.append(_text);
            _this.$blimpText[0].scrollTop = 999;
          };
        })(this),
        clear: (function(_this) {
          return function() {
            _this.insertPoint = _this.$blimpText;
            _this._initializeCurrentStyle();
            _this.$blimpText.html("");
          };
        })(this),
        br: (function(_this) {
          return function(ratio) {
            var $newimp;
            if (ratio != null) {
              $newimp = $('<span />').css({
                'position': 'relative',
                'top': (ratio - 1) + 'em'
              });
              _this.insertPoint = $newimp.appendTo(_this.insertPoint);
              _this.insertPoint.css(_this._blimpTextCSS(_this._current_text_style));
            }
            _this.insertPoint.append("<br />");
          };
        })(this),
        showWait: (function(_this) {
          return function() {
            _this.$blimpText.append("<br /><br />").append("<div class='blink'>▼</div>");
            _this.$blimpText[0].scrollTop = 999;
          };
        })(this),
        location: (function(_this) {
          return function(x, y) {
            var $imp_position_checker, $newimp, $newimp_container, baseoffset, offset, offsetx, offsety, re, toparam, xp, yp;
            re = /^(?:(@)?(-?\d*\.?\d*e?\d*)(em|%)?)?$/;
            toparam = function(r) {
              var rp, unit, value;
              if (r == null) {
                return {
                  relative: true,
                  value: 0
                };
              }
              rp = r.match(re);
              if (!rp) {
                return;
              }
              if (!rp[2].length) {
                return {
                  relative: true,
                  value: 0
                };
              }
              if (isNaN(rp[2])) {
                return;
              }
              if (rp[3] === '%') {
                value = rp[2] / 100;
                unit = 'em';
              } else {
                value = Number(rp[2]);
                unit = rp[3] || 'px';
              }
              return {
                relative: !!rp[1],
                value: value + unit
              };
            };
            xp = toparam(x);
            yp = toparam(y);
            if (!((xp != null) && (yp != null))) {
              return;
            }
            if (xp.relative && yp.relative) {
              $newimp = $('<span />').css({
                'position': 'relative',
                'margin-left': xp.value,
                'top': yp.value
              });
              _this.insertPoint = $newimp.appendTo(_this.insertPoint);
            } else {
              if (xp.relative || yp.relative) {
                $imp_position_checker = $('<span>.</span>');
                _this.insertPoint.append($imp_position_checker);
                offset = $imp_position_checker.offset();
                baseoffset = _this.$blimpText.offset();
                offsetx = offset.left - baseoffset.left;
                offsety = offset.top - baseoffset.top;
                $imp_position_checker.remove();
              }
              if (!xp.relative) {
                offsetx = 0;
              }
              if (!yp.relative) {
                offsety = 0;
              }
              $newimp_container = $('<div />').css({
                'position': 'absolute',
                'pointer-events': 'none',
                'text-indent': offsetx + 'px',
                'top': offsety + 'px'
              });
              $newimp = $('<span />').css({
                'position': 'relative',
                'pointer-events': 'auto',
                'margin-left': xp.value,
                'top': yp.value
              });
              _this.insertPoint = $newimp.appendTo($newimp_container.appendTo(_this.$blimpText));
            }
            return _this.insertPoint.css(_this._blimpTextCSS(_this._current_text_style));
          };
        })(this)
      };
    };

    Scope.prototype._blimpTextCSS = function(styles) {
      var css, text_decoration;
      css = {};
      css["cursor"] = styles["cursor"];
      css["font-family"] = styles["font.name"];
      css["font-size"] = "" + styles["font.height"] + "px";
      css["color"] = "#" + styles["font.color"];
      css["background"] = "none";
      css["outline"] = "none";
      css["border"] = "none";
      css["text-shadow"] = styles["font.shadowcolor"] ? "1px 1px 0 #" + styles["font.shadowcolor"] : "none";
      css["font-weight"] = styles["font.bold"] ? "bold" : "normal";
      css["font-style"] = styles["font.italic"] ? "italic" : "normal";
      text_decoration = [];
      if (styles["font.strike"]) {
        text_decoration.push('line-through');
      }
      if (styles["font.underline"]) {
        text_decoration.push('underline');
      }
      css["text-decoration"] = text_decoration.length ? text_decoration.join(' ') : "none";
      return css;
    };

    Scope.prototype._blimpClickableTextCSS = function(styles) {
      switch (styles["style"]) {
        case "square":
          return {
            base: {
              color: "#" + styles["font.color"]
            },
            over: {
              outline: "solid 1px #" + styles["pen.color"],
              background: "#" + styles["brush.color"]
            }
          };
        case "underline":
          return {
            base: {
              color: "#" + styles["font.color"]
            },
            over: {
              'border-bottom': "solid 1px #" + styles["pen.color"]
            }
          };
        case "square+underline":
          return {
            base: {
              color: "#" + styles["font.color"]
            },
            over: {
              outline: "solid 1px #" + styles["pen.color"],
              background: "#" + styles["brush.color"],
              'border-bottom': "solid 1px #" + styles["pen.color"]
            }
          };
        case "none":
          return {
            base: {
              color: "#" + font_color
            }
          };
      }
    };

    Scope.prototype._initializeCurrentStyle = function() {
      var name, value, _ref, _ref1, _ref2, _results;
      this._current_text_style = {};
      _ref = this._text_style;
      for (name in _ref) {
        value = _ref[name];
        this._current_text_style[name] = value;
      }
      this._current_choice_style = {};
      _ref1 = this._choice_style;
      for (name in _ref1) {
        value = _ref1[name];
        this._current_choice_style[name] = value;
      }
      this._current_anchor_style = {};
      _ref2 = this._anchor_style;
      _results = [];
      for (name in _ref2) {
        value = _ref2[name];
        _results.push(this._current_anchor_style[name] = value);
      }
      return _results;
    };

    return Scope;

  })();

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = Scope;
  } else if (this.Ikagaka != null) {
    this.Ikagaka.Scope = Scope;
  } else {
    this.Scope = Scope;
  }

}).call(this);
