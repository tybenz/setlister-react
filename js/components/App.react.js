var React = require( 'react' );
var Nav = require( './Nav.react' );
var Sidebar = require( './Sidebar.react' );
var Song = require( './Song.react' );
var SetlistSongStore = require( '../stores/SetlistSongStore' );
var SongList = require( './SongList.react' );

function getSetlistState() {
    return {
        songs: SetlistSongStore.getAll()
    };
}

var App = React.createClass({
    getInitialState: function() {
        return getSetlistState();
    },

    componentDidMount: function() {
        document.body.classList.remove( 'preload' );

        SetlistSongStore.addChangeListener( this._onChange );
    },

    _onChange: function() {
        this.setState( getSetlistState() );
    },

    render: function() {
        var songs = [];

        for ( var i in this.state.songs ) {
            if ( this.state.songs.hasOwnProperty( i ) ) {
                var song = this.state.songs[i];
                songs.push( Song( { key: i, id: i, title: song.title, text: song.text, originalKey: song.originalKey, dataKey: song.key, capo: song.capo } ) );
            }
        }

        return React.DOM.div(
            {},
            Nav(),
            React.DOM.main(
                {},
                React.DOM.div(
                    { className: 'container' },
                    Sidebar( { songs: this.state.songs } ),
                    React.DOM.section(
                        { className: 'col-sm-9 songs-col' },
                        songs
                    )
                )
            )
        );
    }
});

module.exports = App;
