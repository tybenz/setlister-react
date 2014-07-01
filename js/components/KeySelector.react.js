var React = require( 'react' );
var SetlistActions = require( '../actions/SetlistActions' );

var KeySelector = React.createClass({
    _onKeyChange: function( evt ) {
        evt.preventDefault();
        SetlistActions.updateKey( this.props.songId, evt.target.innerHTML );
    },

    render: function() {
        var buttons = [],
            keys = [ 'Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#' ];

        for ( var i in keys ) {
            if ( keys.hasOwnProperty( i ) ) {
                var key = keys[i];
                buttons.push( React.DOM.button( { type: 'button', onClick: this._onKeyChange, className: 'btn ' + ( this.props.dataKey == key ? 'btn-primary' : 'btn-default' ) }, key ) );
            }
        }

        return React.DOM.div(
            { className: 'keys btn-group-vertical' },
            buttons
        );
    }
});

module.exports = KeySelector;
