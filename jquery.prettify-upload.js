;(function ( $, window, document, undefined ) {
    
    "use strict";

    var pluginName = 'prettifyUpload',
        defaults = {
            buttonClass:'btn btn-info btn-large',
            iconClass:'',
            text:'select a file',
            wrapperHeight: '45px',
            
        };
    function PrettifyUpload( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    PrettifyUpload.prototype.init = function () {
        
        $(this.element).css({
            cursor: 'pointer',
            fontSize: '50px',
            opacity: 0,
            filter:'alpha(opacity: 0)',
            position: 'relative',
            top: '-28px',
            width: '120px',
        });
        
        var wrapper = $('<div />', {'class': 'input-file-wrapper'}).css({
            cursor:'pointer',
            width:'120px',
            height:this.options.wrapperHeight,
            display:'inline-block',
            overflow:'hidden',
            position:'relative',
            marginBottom:'10px',
        });        
        
        var button = $('<button />');
        
        button
            .addClass(this.options.buttonClass)
            .html($('<i />').addClass(this.options.iconClass))
            .append(this.options.text);
        
        $(this.element).wrap(wrapper);    
        
        $(this.element).parents('.input-file-wrapper:first').prepend(button);

        $(this.element).bind('change', function() {
            var self = $(this);
            
            for (var i = 0; i < self[0].files.length; i++) {
              self.parents('.input-file-wrapper')
                  .after($('<p />')
                      .html(self[0].files[i].name)
                      .append($('<a />', {href:'javascript:void(0)', 'class': 'btn btn-mini btn-danger input-file-remove'})
                          .html('remove')
                          .css('margin-left', '10px')
                          .bind('click', function() {
                              $(this).parent().remove();
                              
                              //self[0].files = [];
                          })
                      )                    
                  );            
            }
        });
        
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new PrettifyUpload( this, options ));
            }
        });
    }
    
    $(function() {
        $('[data-pretty-file]').prettifyUpload();
    })

})( jQuery, window, document );