var React = require( 'react' );
var SongListItemActions = require( './SongListItemActions.react' );

var SongListItemLarge = React.createClass({
    render: function() {
        return React.DOM.tr(
            { className: 'song-list-item' },
            React.DOM.td(
                {},
                this.props.num
            ),
            React.DOM.td(
                {},
                this.props.title
            ),
            React.DOM.td(
                {},
                this.props.dataKey
            ),
            React.DOM.td(
                { className: 'actions' },
                SongListItemActions( { id: this.props.id } )
            )
        )
    }
});

module.exports = SongListItemLarge;
