var React = require( 'react' );

var SongListItem = React.createClass({
    render: function() {
        return React.DOM.li(
            { className: 'list-group-item' },
            React.DOM.a(
                { href: '#', className: 'delete-link' },
                React.DOM.span(
                    { className: 'glyphicon glyphicon-trash' }
                )
            ),
            React.DOM.a(
                { href: '#' },
                this.props.title
            )
        )
    }
});

module.exports = SongListItem;
