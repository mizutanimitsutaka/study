(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $(function() {
    var CarouselView, MainView, NavigationView, carouselView, mainView, navigationView, _ref, _ref1, _ref2;
    NavigationView = (function(_super) {
      __extends(NavigationView, _super);

      function NavigationView() {
        _ref = NavigationView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NavigationView.prototype.el = $('.header-nav');

      NavigationView.prototype.initialize = function(options) {
        this.watcher = scrollMonitor.create(this.el);
        this.watcher.lock();
        return this.watcher.stateChange(_.bind(this.stateChangeHandler, this));
      };

      NavigationView.prototype.stateChangeHandler = function() {
        return this.$el.toggleClass('fixed', this.watcher.isAboveViewport);
      };

      return NavigationView;

    })(Backbone.View);
    MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        _ref1 = MainView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      MainView.prototype.itemSelector = '.item';

      MainView.prototype.initialize = function(options) {
        this.$container = $('.main-container');
        return this.initMasonry();
      };

      MainView.prototype.initMasonry = function() {
        return this.$container.imagesLoaded(_.bind(this.imagesLoadedHandler, this));
      };

      MainView.prototype.imagesLoadedHandler = function() {
        this.init = {
          columnWidth: 240,
          itemSelector: this.itemSelector
        };
        return this.$container.masonry(this.init);
      };

      return MainView;

    })(Backbone.View);
    CarouselView = (function(_super) {
      __extends(CarouselView, _super);

      function CarouselView() {
        _ref2 = CarouselView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      CarouselView.prototype.initialize = function(options) {
        this.init = {
          width: 960,
          height: 600,
          time: 3000,
          slideStage: '.carouse-container',
          slideMember: 'li',
          nav: false
        };
        return $('.header-contents').fullWidthSlider(this.init);
      };

      return CarouselView;

    })(Backbone.View);
    carouselView = new CarouselView;
    navigationView = new NavigationView;
    return mainView = new MainView;
  });

}).call(this);
