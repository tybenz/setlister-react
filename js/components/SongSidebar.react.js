var React = require( 'react' );
var CapoSelector = require( './CapoSelector.react' );
var KeySelector = require( './KeySelector.react' );

var SongSidebar = React.createClass({
    getInitialState: function() {
        return {
            open: false
        };
    },

    render: function() {
        return React.DOM.div(
            { className: 'sidebar' + ( this.state.open ? ' slide-in' : '' ) },
            React.DOM.p( { className: 'label' }, 'Capo' ),
            React.DOM.p( { className: 'label' }, 'Key' ),
            React.DOM.br(),
            CapoSelector( { songId: this.props.songId, capo: this.props.capo } ),
            KeySelector( { songId: this.props.songId, dataKey: this.props.dataKey } ),
            React.DOM.a({
                href: '#',
                className: 'tab glyphicon ' + ( this.state.open ? 'glyphicon-chevron-right' : 'glyphicon-chevron-left' ),
                onClick: this._tabClick
            })
        );
    },

    _tabClick: function( evt ) {
        evt.preventDefault();

        var open = this.state.open;
        if ( open ) {
            this.setState( { open: false } );
        } else {
            this.setState( { open: true } );
        }
    }
});

module.exports = SongSidebar;
