var $ = require( 'jquery' );

Utils = {
    getAlignmentAdjustment: function( align, refDim, posDim ) {
          var value = 0;
          switch ( align ) {
                case 'left':
                case 'top':
                      value = 0;
                      break;
                case 'right':
                case 'bottom':
                      value = refDim - posDim;
                      break;
                case 'center':
                default:
                      value = ( refDim - posDim ) / 2;
                      break;
          }
          return value;
    },
    positionElementAroundAnother: function( refElement, posElement, options ) {
          options = $.extend({
                      // Where to position the posElement relative to the
                      // refElement. Possible values are:
                      //
                      //            'right', 'left', 'above', or 'below'
                      //
                      // The default value is 'right'.

                      position: 'right',

                      // The amount of offset to add to the calculated position
                      // of the posElement. If position is 'right' or 'left'
                      // a positive value moves the posElement away from the
                      // refElement in the horizontal direction. If position is
                      // 'above' or 'below' a positive value moves the refElement
                      // away from the refElement in the vertical direction.
                      //
                      // The default value is zero, which means the posElement
                      // will be touching the refElement.

                      positionOffset: 0,

                      // Decide how to align the side of the refElement that is
                      // closest to the refElement. The allowed value of this
                      // property depends on the value of the position property.
                      // If position is 'right' or 'left', then allowed values
                      // for the align property are 'top', 'bottom' or 'center'.
                      // If position is 'above' or 'below', then allowed values
                      // are 'left', 'right' or 'center'.

                      align: 'center',

                      // The amount of offset to apply to the calculated
                      // alignment. If the align attribute adjusts the
                      // horizontal direction, a positive value shifts
                      // the posElement to the left. If the align attribute
                      // adjusts the vertical direction, a positive value
                      // shifts the posElement down.

                      alignOffset: 0
                }, options );

          var $ref = $( refElement ); // reference-element
          var $ele = $( posElement ); // the element to position
          var $offsetParent = $ele.offsetParent();

          $ele.removeClass( 'above below left right' );

          var rOffset = $ref.offset();
          var rWidth = $ref.outerWidth();
          var rHeight = $ref.outerHeight();
          var pOffset = $offsetParent.offset();
          var wWidth = $ele.outerWidth();
          var wHeight = $ele.outerHeight();

          var positionOffset = options.positionOffset;
          var align = options.align;
          var alignOffset = options.alignOffset;

          // Calculate an initial position where the top-left corner of
          // the posElement is the same as the refElement.

          var x = rOffset.left - pOffset.left;
          var y = rOffset.top - pOffset.top;

          // Calculate the position based on the specified
          // position value.
          switch ( options.position ) {
                case 'above':
                      x = x + this.getAlignmentAdjustment( align, rWidth, wWidth ) + alignOffset;
                      y = y - wHeight - positionOffset;
                      break;
                case 'below':
                      x = x + this.getAlignmentAdjustment( align, rWidth, wWidth ) + alignOffset;
                      y = y + rHeight + positionOffset;
                      break;
                case 'left':
                      x = x - wWidth - positionOffset;
                      y = y + this.getAlignmentAdjustment( align, rHeight, wHeight ) + alignOffset;
                      break;
                case 'right':
                default:
                      x = x + rWidth + positionOffset;
                      y = y + this.getAlignmentAdjustment( align, rHeight, wHeight ) + alignOffset;
                      break;
          }

          return { x: x, y: y };
    }
};

module.exports = Utils;
