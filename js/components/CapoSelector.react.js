var React = require( 'react' );

var CapoSelector = React.createClass({
    render: function() {
        var buttons = [];

        for ( var i = 1; i <= 6; i++ ) {
            buttons.push( React.DOM.button( { type: 'button', className: 'btn ' + ( this.props.capo == i ? 'btn-primary' : 'btn-default' ) }, i ) );
        }

        return React.DOM.div(
            { className: 'capo btn-group-vertical' },
            buttons
        );
    }
});

module.exports = CapoSelector;
