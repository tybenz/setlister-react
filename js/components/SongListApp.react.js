var React = require( 'react' );
var SongList = require( './SongList.react' );
var Nav = require( './Nav.react' );
var SetlistPopover = require( './SetlistPopover.react' );
var SongConstants = require( '../constants/SongConstants' );
var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var SongStore = require( '../stores/SongStore' );
var $ = require( 'jquery' );

function getSongsState() {
    return {
        songs: SongStore.getAll()
    };
}

var SongListApp = React.createClass({
    getInitialState: function() {
        return getSongsState();
    },

    componentDidMount: function() {
        // Using app dispatcher to report changes in UI/state as well as
        // changes to the model
        var app = this;
        AppDispatcher.register( function( payload ) {
            var action = payload.action;

            switch ( action.actionType ) {
                case SongConstants.OPEN_SETLIST_POPOVER:
                    app.openPopover( action.id );
                    break;
                default: return true;
            }

            return true;
        });

        // Listening to disable SetlisterPopover
        $( 'body' ).on( 'click', function( evt ) {
            if ( !$( evt.target ).hasClass( 'glyphicon-plus-sign' ) ) {
                app.closePopover();
            }
        });

        // Listen for changes on our SongStore and update state/refresh views
        // if necessary
        SongStore.addChangeListener( this._onChange );
    },

    _onChange: function() {
        this.setState( getSongsState );
    },

    openPopover: function( id ) {
        this.setState({
            popoverOpen: true,
            popoverRelatedId: id
        });
    },

    closePopover: function() {
        this.setState({
            popoverOpen: false
        })
    },

    render: function() {
        return React.DOM.div(
            {},
            Nav(),
            React.DOM.main(
                {},
                React.DOM.div(
                    { className: 'container' },
                    SongList( { songs: this.state.songs } ),
                    SetlistPopover( { show: this.state.popoverOpen, relatedId: this.state.popoverRelatedId } )
                )
            )
        );
    }
});

module.exports = SongListApp;
