$ ->
  class NavigationView extends Backbone.View
    el: $('.header-nav')

    initialize: (options) ->
      @watcher = scrollMonitor.create(@el)
      @watcher.lock()
      @watcher.stateChange(_.bind(@stateChangeHandler, @))

    # scrollMonitor status change handler
    stateChangeHandler: () ->
      @$el.toggleClass('fixed', @watcher.isAboveViewport)


  class MainView extends Backbone.View
    itemSelector: '.item'
    
    initialize: (options) ->
      @$container = $('.main-container')
      @initMasonry()

    #init masonry
    initMasonry: () ->
      @$container.imagesLoaded(_.bind(@imagesLoadedHandler, @))

    imagesLoadedHandler: () ->
      @init = 
        columnWidth: 240
        itemSelector: @itemSelector
      @$container.masonry(@init)

  class CarouselView extends Backbone.View

    initialize: (options) ->
      @init = 
        width: 960
        height: 600
        time: 3000
        slideStage: '.carouse-container'
        slideMember: 'li'
        nav: false

      $('.header-contents').fullWidthSlider(@init)


  carouselView = new CarouselView
  navigationView = new NavigationView
  mainView = new MainView
