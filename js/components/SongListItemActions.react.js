var React = require( 'react' );
var SongActions = require( '../actions/SongActions' );

var SongListItemActions = React.createClass({
    _onPlusClicked: function( evt ) {
        evt.preventDefault();
        var id = parseInt( evt.target.id.replace( /plus-sign-/, '' ) );
        SongActions.openSetlistPopover( id );
    },

    render: function() {
        return React.DOM.span(
            {},
            React.DOM.a( { className: 'glyphicon glyphicon-pencil', href: '#' } ),
            React.DOM.a( { className: 'glyphicon glyphicon-trash', href: '#' } ),
            React.DOM.a( { className: 'glyphicon glyphicon-plus-sign', href: '#', id: 'plus-sign-' + this.props.id, onClick: this._onPlusClicked } )
        );
    }
});

module.exports = SongListItemActions;
