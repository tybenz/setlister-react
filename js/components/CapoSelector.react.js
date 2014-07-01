var React = require( 'react' );
var SetlistActions = require( '../actions/SetlistActions' );

var CapoSelector = React.createClass({
    _onCapoChange: function( evt ) {
        evt.preventDefault();
        SetlistActions.updateCapo( this.props.songId, parseInt( evt.target.innerHTML ) );
    },

    render: function() {
        var buttons = [];

        for ( var i = 0; i <= 6; i++ ) {
            buttons.push(
                React.DOM.button(
                    {
                        type: 'button',
                        className: 'btn ' + ( this.props.capo == i ? 'btn-primary' : 'btn-default' ),
                        onClick: this._onCapoChange
                    },
                    i
                )
            );
        }

        return React.DOM.div(
            { className: 'capo btn-group-vertical' },
            buttons
        );
    }
});

module.exports = CapoSelector;
